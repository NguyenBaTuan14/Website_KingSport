app.controller('ReportBookingController', function($scope, $http, $location) {
    // Existing code for authentication and initial setup
    $scope.username = '';

    $scope.getUsername = function() {
        $http.get('http://localhost:8080/sportify/user/get-username', {
            withCredentials: true
        }).then(function(response) {
            if (response.data.username) {
                $scope.username = response.data.username;
                $http.get("/rest/authorized/getRole/" + $scope.username).then(resp => {
                    $scope.listRoles = resp.data;
                    if ($scope.listRoles[0][1] === 'dont') {
                        $location.path("/admin/unauthorized");
                    }
                });
            } else {
                console.log('Error fetching username:', response.data.error);
            }
        }).catch(function(error) {
            console.log('Error fetching username:', error);
        });
    };

    $scope.getUsername();

    // Existing chart functions
    $scope.barcharts = function() {
        $http.get("/rest/dashboard/barcharts_a").then(resp => {
            $scope.barcharts_a = resp.data;
            var currentYear = new Date().getFullYear() - 12;
            var barChartData = [];
            for (var i = 0; i <= 12; i++) {
                var year = currentYear + i;
                var a = 1000 + "VND";
                barChartData.push({ y: year.toString(), a: a });
            }
            document.getElementById('line-charts').innerHTML = '';
            Morris.Bar({
                element: 'line-charts',
                data: barChartData,
                xkey: 'y',
                ykeys: ['a'],
                labels: ['Tổng doanh thu đặt sân'],
                lineColors: ['#f43b48', '#453a94'],
                lineWidth: '3px',
                barColors: ['#f43b48', '#453a94'],
                resize: true,
                redraw: true
            });
        });
    };

    $scope.line_charts_doanhThu = function() {
        $http.get("/rest/reportBooking/rpDoanhThuBookingTrongThang", {
            params: {
                year: $scope.monthNam,
                month: $scope.monthThang
            }
        }).then(resp => {
            $scope.rpDoanhThuBookingTrongThang = resp.data;
            var lineChartData = [];
            for (var i = 0; i < $scope.rpDoanhThuBookingTrongThang.length; i++) {
                var ngay = $scope.rpDoanhThuBookingTrongThang[i][0];
                var a = $scope.rpDoanhThuBookingTrongThang[i][1];
                lineChartData.push({ y: ngay, a: a });
            }
            document.getElementById('line-charts').innerHTML = '';
            Morris.Line({
                element: 'line-charts',
                data: lineChartData,
                xkey: 'y',
                ykeys: ['a'],
                labels: ['Tổng doanh thu phiếu đặt sân'],
                lineColors: ['#f43b48'],
                lineWidth: '3px',
                xLabels: 'y',
                parseTime: false,
                resize: true,
                redraw: true
            });
        });
    };

    // Fetch years for booking
    $http.get("/rest/reportBooking/getYearBooking").then(resp => {
        $scope.getYearBooking = resp.data;
    });

    // Initialize scope variables
    $scope.monthNam = 0;
    $scope.monthThang = 0;
    $scope.year_nam = 0;
    $scope.startDate = null;
    $scope.endDate = null;
    $scope.loaiThongKe = 1;
    $scope.hinhThuc = 'ko';
    $scope.titleBD = '';
    $scope.bangThongKe = '';

    // Function to calculate totals for DoanhThuNam
    $scope.calculateTotalsDoanhThuNam = function(data) {
        var totals = {
            cancelCost: 0,        // Chi trả hủy đơn (rpdty[2])
            depositRevenue: 0,    // Doanh thu phiếu đặt sân đã cọc (rpdty[3])
            completedRevenue: 0,  // Doanh thu phiếu đặt sân đã hoàn thành (rpdty[4])
            estimatedRevenue: 0,  // Doanh thu ước tính (rpdty[5])
            actualRevenue: 0      // Doanh thu thực tế (rpdty[1])
        };
        data.forEach(function(item) {
            totals.cancelCost += parseFloat(item[2]) || 0;
            totals.depositRevenue += parseFloat(item[3]) || 0;
            totals.completedRevenue += parseFloat(item[4]) || 0;
            totals.estimatedRevenue += parseFloat(item[5]) || 0;
            totals.actualRevenue += parseFloat(item[1]) || 0;
        });
        return totals;
    };

    // Function to calculate totals for DoanhThuThang
    $scope.calculateTotalsDoanhThuThang = function(data) {
        var totals = {
            cancelCost: 0,
            depositRevenue: 0,
            completedRevenue: 0,
            estimatedRevenue: 0,
            actualRevenue: 0
        };
        data.forEach(function(item) {
            totals.cancelCost += parseFloat(item[2]) || 0;
            totals.depositRevenue += parseFloat(item[3]) || 0;
            totals.completedRevenue += parseFloat(item[4]) || 0;
            totals.estimatedRevenue += parseFloat(item[5]) || 0;
            totals.actualRevenue += parseFloat(item[1]) || 0;
        });
        return totals;
    };

    // Function to calculate totals for DoanhThuDateRange
    $scope.calculateTotalsDoanhThuDateRange = function(data) {
        var totals = {
            cancelCost: 0,
            depositRevenue: 0,
            completedRevenue: 0,
            actualRevenue: 0
        };
        data.forEach(function(item) {
            totals.cancelCost += parseFloat(item[2]) || 0;
            totals.depositRevenue += parseFloat(item[3]) || 0;
            totals.completedRevenue += parseFloat(item[4]) || 0;
            totals.actualRevenue += parseFloat(item[1]) || 0;
        });
        return totals;
    };

    // Function to calculate totals for SoLuongNam
    $scope.calculateTotalsSoLuongNam = function(data) {
        var totals = {
            cancelCount: 0,      // Số lượng phiếu hủy (rpsly[2])
            depositCount: 0,     // Số lượng phiếu đặt cọc (rpsly[3])
            completedCount: 0,   // Số lượng phiếu hoàn thành (rpsly[4])
            totalCount: 0        // Tổng số lượng phiếu (rpsly[1])
        };
        data.forEach(function(item) {
            totals.cancelCount += parseInt(item[2]) || 0;
            totals.depositCount += parseInt(item[3]) || 0;
            totals.completedCount += parseInt(item[4]) || 0;
            totals.totalCount += parseInt(item[1]) || 0;
        });
        return totals;
    };

    // Function to calculate totals for SoLuongThang
    $scope.calculateTotalsSoLuongThang = function(data) {
        var totals = {
            cancelCount: 0,
            depositCount: 0,
            completedCount: 0,
            totalCount: 0
        };
        data.forEach(function(item) {
            totals.cancelCount += parseInt(item[2]) || 0;
            totals.depositCount += parseInt(item[3]) || 0;
            totals.completedCount += parseInt(item[4]) || 0;
            totals.totalCount += parseInt(item[1]) || 0;
        });
        return totals;
    };

    // Function to calculate totals for SoLuongDateRange
    $scope.calculateTotalsSoLuongDateRange = function(data) {
        var totals = {
            cancelCount: 0,
            depositCount: 0,
            completedCount: 0,
            totalCount: 0
        };
        data.forEach(function(item) {
            totals.cancelCount += parseInt(item[2]) || 0;
            totals.depositCount += parseInt(item[3]) || 0;
            totals.completedCount += parseInt(item[4]) || 0;
            totals.totalCount += parseInt(item[1]) || 0;
        });
        return totals;
    };

    // Handle report viewing with totals calculation
    $scope.xemBC = function() {
        if ($scope.hinhThuc === 'ko') {
            showErrorToast("Vui lòng chọn hình thức thống kê");
            return;
        }

        if ($scope.loaiThongKe === 1) { // Doanh thu
            if ($scope.hinhThuc === 'year') {
                if ($scope.year_nam === 0) {
                    showErrorToast("Vui lòng chọn năm");
                    return;
                }
                $scope.titleBD = 'Doanh thu đặt sân trong năm ' + $scope.year_nam;
                $http.get("/rest/reportBooking/rpDoanhThuBookingTrongNam", {
                    params: { year: $scope.year_nam }
                }).then(resp => {
                    $scope.rpDoanhThuBookingTrongNam = resp.data;
                    // Calculate totals for DoanhThuNam
                    $scope.totalsDoanhThuNam = $scope.calculateTotalsDoanhThuNam($scope.rpDoanhThuBookingTrongNam);
                    var barChartData = [];
                    for (var i = 0; i < $scope.rpDoanhThuBookingTrongNam.length; i++) {
                        var month = $scope.rpDoanhThuBookingTrongNam[i][0];
                        var a = $scope.rpDoanhThuBookingTrongNam[i][1];
                        barChartData.push({ y: month, a: a });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'doanhThuNam';
                    Morris.Bar({
                        element: 'bieuDo',
                        data: barChartData,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Tổng doanh thu phiếu đặt sân'],
                        lineColors: ['#f43b48'],
                        lineWidth: '3px',
                        barColors: ['#f43b48'],
                        resize: true,
                        redraw: true,
                        xLabels: 'y',
                        parseTime: false
                    });
                });
            } else if ($scope.hinhThuc === 'month') {
                if ($scope.monthNam === 0) {
                    showErrorToast("Vui lòng chọn năm");
                    return;
                }
                if ($scope.monthThang === 0) {
                    showErrorToast("Vui lòng chọn tháng");
                    return;
                }
                $scope.titleBD = 'Doanh thu đặt sân trong tháng ' + $scope.monthThang;
                $http.get("/rest/reportBooking/rpDoanhThuBookingTrongThang", {
                    params: {
                        year: $scope.monthNam,
                        month: $scope.monthThang
                    }
                }).then(resp => {
                    $scope.rpDoanhThuBookingTrongThang = resp.data;
                    // Calculate totals for DoanhThuThang
                    $scope.totalsDoanhThuThang = $scope.calculateTotalsDoanhThuThang($scope.rpDoanhThuBookingTrongThang);
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpDoanhThuBookingTrongThang.length; i++) {
                        var ngay = $scope.rpDoanhThuBookingTrongThang[i][0];
                        var a = $scope.rpDoanhThuBookingTrongThang[i][1];
                        lineChartData.push({ y: ngay, a: a });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'doanhThuThang';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Tổng doanh thu phiếu đặt sân'],
                        lineColors: ['#f43b48'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            } else if ($scope.hinhThuc === 'dateRange') {
                if (!$scope.startDate || !$scope.endDate) {
                    showErrorToast("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc");
                    return;
                }
                var start = new Date($scope.startDate);
                var end = new Date($scope.endDate);
                if (start > end) {
                    showErrorToast("Ngày bắt đầu không được lớn hơn ngày kết thúc");
                    return;
                }
                var formattedStartDate = start.toISOString().split('T')[0];
                var formattedEndDate = end.toISOString().split('T')[0];
                $scope.titleBD = 'Doanh thu đặt sân từ ' + formattedStartDate + ' đến ' + formattedEndDate;
                $http.get("/rest/reportBooking/getRevenueByDateRange", {
                    params: {
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    }
                }).then(resp => {
                    $scope.rpDoanhThuByDateRange = resp.data;
                    // Calculate totals for DoanhThuDateRange
                    $scope.totalsDoanhThuDateRange = $scope.calculateTotalsDoanhThuDateRange($scope.rpDoanhThuByDateRange);
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpDoanhThuByDateRange.length; i++) {
                        var ngay = $scope.rpDoanhThuByDateRange[i][0];
                        var a = $scope.rpDoanhThuByDateRange[i][1];
                        lineChartData.push({ y: ngay, a: a });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'doanhThuDateRange';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Tổng doanh thu phiếu đặt sân'],
                        lineColors: ['#f43b48'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            }
        } else { // Tổng số lượng phiếu
            if ($scope.hinhThuc === 'year') {
                if ($scope.year_nam === 0) {
                    showErrorToast("Vui lòng chọn năm");
                    return;
                }
                $scope.titleBD = 'Tổng số lượng phiếu đặt sân trong năm ' + $scope.year_nam;
                $http.get("/rest/reportBooking/rpSoLuongBookingTrongNam", {
                    params: { year: $scope.year_nam }
                }).then(resp => {
                    $scope.rpSoLuongBookingTrongNam = resp.data;
                    // Calculate totals for SoLuongNam
                    $scope.totalsSoLuongNam = $scope.calculateTotalsSoLuongNam($scope.rpSoLuongBookingTrongNam);
                    var barChartData = [];
                    for (var i = 0; i < $scope.rpSoLuongBookingTrongNam.length; i++) {
                        var month = $scope.rpSoLuongBookingTrongNam[i][0];
                        var tong = $scope.rpSoLuongBookingTrongNam[i][1];
                        var cancel = $scope.rpSoLuongBookingTrongNam[i][2];
                        var coc = $scope.rpSoLuongBookingTrongNam[i][3];
                        var done = $scope.rpSoLuongBookingTrongNam[i][4];
                        barChartData.push({ y: month, a: tong, b: cancel, c: coc, d: done });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'soLuongNam';
                    Morris.Bar({
                        element: 'bieuDo',
                        data: barChartData,
                        xkey: 'y',
                        ykeys: ['a', 'b', 'c', 'd'],
                        labels: ['Tổng số phiếu đặt sân', 'Tổng số phiếu đặt sân đã hủy', 'Tổng số phiếu đặt sân đã cọc', 'Tổng số phiếu đặt sân hoàn thành'],
                        lineColors: ['green', 'red', 'orange', 'blue'],
                        lineWidth: '1px',
                        barColors: ['green', 'red', 'orange', 'blue'],
                        resize: true,
                        redraw: true,
                        xLabels: 'y',
                        parseTime: false
                    });
                });
            } else if ($scope.hinhThuc === 'month') {
                if ($scope.monthNam === 0) {
                    showErrorToast("Vui lòng chọn năm");
                    return;
                }
                if ($scope.monthThang === 0) {
                    showErrorToast("Vui lòng chọn tháng");
                    return;
                }
                $scope.titleBD = 'Tổng số lượng phiếu đặt sân trong tháng ' + $scope.monthThang;
                $http.get("/rest/reportBooking/rpSoLuongBookingTrongThang", {
                    params: {
                        year: $scope.monthNam,
                        month: $scope.monthThang
                    }
                }).then(resp => {
                    $scope.rpSoLuongBookingTrongThang = resp.data;
                    // Calculate totals for SoLuongThang
                    $scope.totalsSoLuongThang = $scope.calculateTotalsSoLuongThang($scope.rpSoLuongBookingTrongThang);
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpSoLuongBookingTrongThang.length; i++) {
                        var ngay = $scope.rpSoLuongBookingTrongThang[i][0];
                        var tong = $scope.rpSoLuongBookingTrongThang[i][1];
                        var cancel = $scope.rpSoLuongBookingTrongThang[i][2];
                        var coc = $scope.rpSoLuongBookingTrongThang[i][3];
                        var done = $scope.rpSoLuongBookingTrongThang[i][4];
                        lineChartData.push({ y: ngay, a: tong, b: cancel, c: coc, d: done });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'soLuongThang';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a', 'b', 'c', 'd'],
                        labels: ['Tổng số phiếu đặt sân', 'Tổng số phiếu đặt sân đã hủy', 'Tổng số phiếu đặt sân đã cọc', 'Tổng số phiếu đặt sân hoàn thành'],
                        lineColors: ['green', 'red', 'orange', 'blue'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            } else if ($scope.hinhThuc === 'dateRange') {
                if (!$scope.startDate || !$scope.endDate) {
                    showErrorToast("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc");
                    return;
                }
                var start = new Date($scope.startDate);
                var end = new Date($scope.endDate);
                if (start > end) {
                    showErrorToast("Ngày bắt đầu không được lớn hơn ngày kết thúc");
                    return;
                }
                var formattedStartDate = start.toISOString().split('T')[0];
                var formattedEndDate = end.toISOString().split('T')[0];
                $scope.titleBD = 'Tổng số lượng phiếu đặt sân từ ' + formattedStartDate + ' đến ' + formattedEndDate;
                $http.get("/rest/reportBooking/getBookingsByDateRange", {
                    params: {
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    }
                }).then(resp => {
                    $scope.rpSoLuongByDateRange = resp.data;
                    // Calculate totals for SoLuongDateRange
                    $scope.totalsSoLuongDateRange = $scope.calculateTotalsSoLuongDateRange($scope.rpSoLuongByDateRange);
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpSoLuongByDateRange.length; i++) {
                        var ngay = $scope.rpSoLuongByDateRange[i][0];
                        var tong = $scope.rpSoLuongByDateRange[i][1];
                        var cancel = $scope.rpSoLuongByDateRange[i][2];
                        var coc = $scope.rpSoLuongByDateRange[i][3];
                        var done = $scope.rpSoLuongByDateRange[i][4];
                        lineChartData.push({ y: ngay, a: tong, b: cancel, c: coc, d: done });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'soLuongDateRange';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a', 'b', 'c', 'd'],
                        labels: ['Tổng số phiếu đặt sân', 'Tổng số phiếu đặt sân đã hủy', 'Tổng số phiếu đặt sân đã cọc', 'Tổng số phiếu đặt sân hoàn thành'],
                        lineColors: ['green', 'red', 'orange', 'blue'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            }
        }
    };

    // Toast function (unchanged)
    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");
            const autoRemoveId = setTimeout(function() {
                main.removeChild(toast);
            }, duration + 1000);

            toast.onclick = function(e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toastDesign", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fas fa-times"></i>
                </div>
            `;
            main.appendChild(toast);
        }
    }

    function showSuccessToast(message) {
        var toastMessage = message || "Đã thêm nhân viên thành công.";
        toast({
            title: "Thành công!",
            message: toastMessage,
            type: "success",
            duration: 5000
        });
    }

    function showErrorToast(error) {
        toast({
            title: "Thất bại!",
            message: error,
            type: "error",
            duration: 5000
        });
    }

    $scope.clearErrors = function() {
        $scope.errors = [];
    };

    function refreshPageAfterThreeSeconds() {
        setTimeout(function() {
            location.reload();
        }, 2000);
    }

    // Currency formatting (unchanged)
    $scope.formatCurrency = function(value) {
        var formattedValue = new Intl.NumberFormat('vi-VN').format(value);
        return formattedValue + ' VND';
    };

    // Date formatting (unchanged)
    $scope.formatDate = function(dateStr) {
        var date = new Date(dateStr);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Excel export functions (unchanged)
    $scope.downloadExcelDTBookingNam = function() {
        $http({
            url: "http://localhost:8080/rest/reportBooking/downloadExcelDTBookingNam",
            method: "GET",
            responseType: "arraybuffer",
            params: { year: $scope.year_nam }
        }).then(function(response) {
            var blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;
            a.download = "ReportDoanhThuBookingTheoNam_" + $scope.year_nam + "_" + formattedDate + ".xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }, function(error) {
            console.error("Lỗi khi tải xuống tệp Excel:", error);
        });
    };

    $scope.downloadExcelDTBookingThang = function() {
        $http({
            url: "http://localhost:8080/rest/reportBooking/downloadExcelDTBookingThang",
            method: "GET",
            responseType: "arraybuffer",
            params: {
                year: $scope.monthNam,
                month: $scope.monthThang
            }
        }).then(function(response) {
            var blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;
            a.download = "ReportDoanhThuBookingTheoThang_" + $scope.monthThang + "_" + $scope.monthNam + "_" + formattedDate + ".xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }, function(error) {
            console.error("Lỗi khi tải xuống tệp Excel:", error);
        });
    };

    $scope.downloadExcelSLBookingNam = function() {
        $http({
            url: "http://localhost:8080/rest/reportBooking/downloadExcelSLBookingNam",
            method: "GET",
            responseType: "arraybuffer",
            params: { year: $scope.year_nam }
        }).then(function(response) {
            var blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;
            a.download = "ReportSoLuongBookingTheoNam_" + $scope.year_nam + "_" + formattedDate + ".xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }, function(error) {
            console.error("Lỗi khi tải xuống tệp Excel:", error);
        });
    };

    $scope.downloadExcelSLBookingThang = function() {
        $http({
            url: "http://localhost:8080/rest/reportBooking/downloadExcelSLBookingThang",
            method: "GET",
            responseType: "arraybuffer",
            params: {
                year: $scope.monthNam,
                month: $scope.monthThang
            }
        }).then(function(response) {
            var blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;
            a.download = "ReportSoLuongBookingTheoThang_" + $scope.monthThang + "_" + $scope.monthNam + "_" + formattedDate + ".xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }, function(error) {
            console.error("Lỗi khi tải xuống tệp Excel:", error);
        });
    };

    $scope.downloadExcelRevenueByDateRange = function() {
        var start = new Date($scope.startDate);
        var end = new Date($scope.endDate);
        var formattedStartDate = start.toISOString().split('T')[0];
        var formattedEndDate = end.toISOString().split('T')[0];
        $http({
            url: "http://localhost:8080/rest/reportBooking/downloadExcelRevenueByDateRange",
            method: "GET",
            responseType: "arraybuffer",
            params: {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            }
        }).then(function(response) {
            var blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;
            a.download = "ReportDoanhThu_" + formattedStartDate + "_to_" + formattedEndDate + "_" + formattedDate + ".xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }, function(error) {
            console.error("Lỗi khi tải xuống tệp Excel:", error);
        });
    };

    $scope.downloadExcelBookingsByDateRange = function() {
        var start = new Date($scope.startDate);
        var end = new Date($scope.endDate);
        var formattedStartDate = start.toISOString().split('T')[0];
        var formattedEndDate = end.toISOString().split('T')[0];
        $http({
            url: "http://localhost:8080/rest/reportBooking/downloadExcelBookingsByDateRange",
            method: "GET",
            responseType: "arraybuffer",
            params: {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            }
        }).then(function(response) {
            var blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;
            a.download = "ReportSoLuong_" + formattedStartDate + "_to_" + formattedEndDate + "_" + formattedDate + ".xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }, function(error) {
            console.error("Lỗi khi tải xuống tệp Excel:", error);
        });
    };
});