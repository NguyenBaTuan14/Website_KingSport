app.controller('ReportOrderController', function($scope, $http, $location, $filter) {
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

    // Lấy năm của phiếu đặt sân
    $http.get("/rest/reportOrder/getYearOrder").then(resp => {
        $scope.getYearOrder = resp.data;
    });

    $scope.monthNam = 0;
    $scope.monthThang = 0;
    $scope.year_nam = 0;
    $scope.loaiThongKe = 1;
    $scope.hinhThuc = 'ko';
    $scope.titleBD = '';
    $scope.bangThongKe = '';
    $scope.startDate = '';
    $scope.endDate = '';

    $scope.xemBC = function() {
        if ($scope.hinhThuc === 'ko') {
            showErrorToast("Vui lòng chọn hình thức thống kê");
            return;
        }
        if ($scope.loaiThongKe === 1) {
            if ($scope.hinhThuc === 'year') {
                if ($scope.year_nam === 0) {
                    showErrorToast("Vui lòng chọn năm");
                    return;
                }
                $scope.titleBD = 'Doanh thu đặt hàng trong năm ' + $scope.year_nam;
                $http.get("/rest/reportOrder/rpDoanhThuOrderTrongNam", {
                    params: { year: $scope.year_nam }
                }).then(resp => {
                    $scope.rpDoanhThuOrderTrongNam = resp.data;
                    // Calculate totals with validation
                    $scope.totalDoanhThuNam = [0, 0, 0, 0, 0]; // [thucte, huy, done, uoctinh]
                    angular.forEach($scope.rpDoanhThuOrderTrongNam, function(item) {
                        $scope.totalDoanhThuNam[1] += parseFloat(item[1] || 0); // thucte
                        $scope.totalDoanhThuNam[2] += parseFloat(item[2] || 0); // huy
                        $scope.totalDoanhThuNam[3] += parseFloat(item[3] || 0); // done
                        $scope.totalDoanhThuNam[4] += parseFloat(item[4] || 0); // uoctinh
                    });
                    var barChartData = [];
                    for (var i = 0; i < $scope.rpDoanhThuOrderTrongNam.length; i++) {
                        var month = $scope.rpDoanhThuOrderTrongNam[i][0];
                        var a = $scope.rpDoanhThuOrderTrongNam[i][1];
                        barChartData.push({ y: month, a: a });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'doanhThuNam';
                    Morris.Bar({
                        element: 'bieuDo',
                        data: barChartData,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Tổng doanh thu phiếu đặt hàng'],
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
                $scope.titleBD = 'Doanh thu đặt hàng trong tháng ' + $scope.monthThang;
                $http.get("/rest/reportOrder/rpDoanhThuOrderTrongThang", {
                    params: { year: $scope.monthNam, month: $scope.monthThang }
                }).then(resp => {
                    $scope.rpDoanhThuOrderTrongThang = resp.data;
                    // Calculate totals with validation
                    $scope.totalDoanhThuThang = [0, 0, 0, 0, 0]; // [thucte, huy, done, uoctinh]
                    angular.forEach($scope.rpDoanhThuOrderTrongThang, function(item) {
                        $scope.totalDoanhThuThang[1] += parseFloat(item[1] || 0); // thucte
                        $scope.totalDoanhThuThang[2] += parseFloat(item[2] || 0); // huy
                        $scope.totalDoanhThuThang[3] += parseFloat(item[3] || 0); // done
                        $scope.totalDoanhThuThang[4] += parseFloat(item[4] || 0); // uoctinh
                    });
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpDoanhThuOrderTrongThang.length; i++) {
                        var ngay = $scope.rpDoanhThuOrderTrongThang[i][0];
                        var a = $scope.rpDoanhThuOrderTrongThang[i][1];
                        lineChartData.push({ y: ngay, a: a });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'doanhThuThang';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Tổng doanh thu phiếu đặt hàng'],
                        lineColors: ['#f43b48'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            } else if ($scope.hinhThuc === 'date') {
                if (!$scope.startDate || !$scope.endDate) {
                    showErrorToast("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc");
                    return;
                }
                var start = new Date($scope.startDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
                var end = new Date($scope.endDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
                $scope.titleBD = 'Doanh thu đặt hàng từ ' + $filter('date')($scope.startDate, 'dd/MM/yyyy') + ' đến ' + $filter('date')($scope.endDate, 'dd/MM/yyyy');
                $http.get("/rest/reportOrder/thongKeDoanhThuTheoNgay", {
                    params: { startDate: start, endDate: end }
                }).then(resp => {
                    $scope.rpDoanhThuOrderTheoNgay = resp.data;
                    // Calculate totals with validation
                    $scope.totalDoanhThuDate = [0, 0, 0, 0]; // [dummy, dangCho, daThanhToan, uocTinh]
                    angular.forEach($scope.rpDoanhThuOrderTheoNgay, function(item) {
                        $scope.totalDoanhThuDate[1] += parseFloat(item[1] || 0); // dangCho
                        $scope.totalDoanhThuDate[2] += parseFloat(item[2] || 0); // daThanhToan
                        $scope.totalDoanhThuDate[3] += parseFloat(item[3] || 0); // uocTinh
                    });
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpDoanhThuOrderTheoNgay.length; i++) {
                        var ngay = $filter('date')(new Date($scope.rpDoanhThuOrderTheoNgay[i][0]), 'dd/MM/yyyy');
                        var a = $scope.rpDoanhThuOrderTheoNgay[i][1] + $scope.rpDoanhThuOrderTheoNgay[i][2];
                        lineChartData.push({ y: ngay, a: a });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'doanhThuDate';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Tổng doanh thu phiếu đặt hàng'],
                        lineColors: ['#f43b48'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            }
        } else {
            if ($scope.hinhThuc === 'year') {
                if ($scope.year_nam === 0) {
                    showErrorToast("Vui lòng chọn năm");
                    return;
                }
                $scope.titleBD = 'Tổng số lượng phiếu đặt hàng trong năm ' + $scope.year_nam;
                $http.get("/rest/reportOrder/rpSoLuongOrderTrongNam", {
                    params: { year: $scope.year_nam }
                }).then(resp => {
                    $scope.rpSoLuongOrderTrongNam = resp.data;
                    // Calculate totals
                    $scope.totalSoLuongNam = [0, 0, 0]; // [tong, cancel, done]
                    angular.forEach($scope.rpSoLuongOrderTrongNam, function(item) {
                        $scope.totalSoLuongNam[1] += parseFloat(item[1] || 0); // tong
                        $scope.totalSoLuongNam[2] += parseFloat(item[2] || 0); // cancel
                        $scope.totalSoLuongNam[3] += parseFloat(item[3] || 0); // done
                    });
                    var barChartData = [];
                    for (var i = 0; i < $scope.rpSoLuongOrderTrongNam.length; i++) {
                        var month = $scope.rpSoLuongOrderTrongNam[i][0];
                        var tong = $scope.rpSoLuongOrderTrongNam[i][1];
                        var cancel = $scope.rpSoLuongOrderTrongNam[i][2];
                        var done = $scope.rpSoLuongOrderTrongNam[i][3];
                        barChartData.push({ y: month, a: tong, b: cancel, c: done });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'soLuongNam';
                    Morris.Bar({
                        element: 'bieuDo',
                        data: barChartData,
                        xkey: 'y',
                        ykeys: ['a', 'b', 'c'],
                        labels: ['Tổng số phiếu đặt sân', 'Tổng số phiếu đặt hàng chưa thanh toán', 'Tổng số phiếu đặt hàng hoàn thành'],
                        lineColors: ['green', 'red', 'blue'],
                        lineWidth: '1px',
                        barColors: ['green', 'red', 'blue'],
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
                $scope.titleBD = 'Tổng số lượng phiếu đặt hàng trong tháng ' + $scope.monthThang;
                $http.get("/rest/reportOrder/rpSoLuongOrderTrongThang", {
                    params: { year: $scope.monthNam, month: $scope.monthThang }
                }).then(resp => {
                    $scope.rpSoLuongOrderTrongThang = resp.data;
                    // Calculate totals
                    $scope.totalSoLuongThang = [0, 0, 0]; // [tong, cancel, done]
                    angular.forEach($scope.rpSoLuongOrderTrongThang, function(item) {
                        $scope.totalSoLuongThang[1] += parseFloat(item[1] || 0); // tong
                        $scope.totalSoLuongThang[2] += parseFloat(item[2] || 0); // cancel
                        $scope.totalSoLuongThang[3] += parseFloat(item[3] || 0); // done
                    });
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpSoLuongOrderTrongThang.length; i++) {
                        var ngay = $scope.rpSoLuongOrderTrongThang[i][0];
                        var tong = $scope.rpSoLuongOrderTrongThang[i][1];
                        var cancel = $scope.rpSoLuongOrderTrongThang[i][2];
                        var done = $scope.rpSoLuongOrderTrongThang[i][3];
                        lineChartData.push({ y: ngay, a: tong, b: cancel, c: done });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'soLuongThang';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a', 'b', 'c'],
                        labels: ['Tổng số phiếu đặt sân', 'Tổng số phiếu đặt hàng chưa thanh toán', 'Tổng số phiếu đặt hàng hoàn thành'],
                        lineColors: ['green', 'red', 'blue'],
                        lineWidth: '3px',
                        xLabels: 'y',
                        parseTime: false,
                        resize: true,
                        redraw: true
                    });
                });
            } else if ($scope.hinhThuc === 'date') {
                if (!$scope.startDate || !$scope.endDate) {
                    showErrorToast("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc");
                    return;
                }
                var start = new Date($scope.startDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
                var end = new Date($scope.endDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
                $scope.titleBD = 'Tổng số lượng phiếu đặt hàng từ ' + $filter('date')($scope.startDate, 'dd/MM/yyyy') + ' đến ' + $filter('date')($scope.endDate, 'dd/MM/yyyy');
                $http.get("/rest/reportOrder/thongKeSoDonDatHangTheoNgay", {
                    params: { startDate: start, endDate: end }
                }).then(resp => {
                    $scope.rpSoLuongOrderTheoNgay = resp.data;
                    // Calculate totals
                    $scope.totalSoLuongDate = [0, 0, 0]; // [tong, cancel, done]
                    angular.forEach($scope.rpSoLuongOrderTheoNgay, function(item) {
                        $scope.totalSoLuongDate[1] += parseFloat(item[1] || 0); // tong
                        $scope.totalSoLuongDate[2] += parseFloat(item[2] || 0); // cancel
                        $scope.totalSoLuongDate[3] += parseFloat(item[3] || 0); // done
                    });
                    var lineChartData = [];
                    for (var i = 0; i < $scope.rpSoLuongOrderTheoNgay.length; i++) {
                        var ngay = $filter('date')(new Date($scope.rpSoLuongOrderTheoNgay[i][0]), 'dd/MM/yyyy');
                        var tong = $scope.rpSoLuongOrderTheoNgay[i][1];
                        var cancel = $scope.rpSoLuongOrderTheoNgay[i][2];
                        var done = $scope.rpSoLuongOrderTheoNgay[i][3];
                        lineChartData.push({ y: ngay, a: tong, b: cancel, c: done });
                    }
                    document.getElementById('bieuDo').innerHTML = '';
                    $scope.bangThongKe = 'soLuongDate';
                    Morris.Line({
                        element: 'bieuDo',
                        data: lineChartData,
                        xkey: 'y',
                        ykeys: ['a', 'b', 'c'],
                        labels: ['Tổng số phiếu đặt sân', 'Tổng số phiếu đặt hàng chưa thanh toán', 'Tổng số phiếu đặt hàng hoàn thành'],
                        lineColors: ['green', 'red', 'blue'],
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

    // Toast function
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
    };

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

    $scope.formatCurrency = function(value) {
        var formattedValue = new Intl.NumberFormat('vi-VN').format(value);
        return formattedValue + ' VND';
    };

    $scope.downloadExcelDTOrderNam = function() {
        $http({
            url: "http://localhost:8080/rest/reportOrder/downloadExcelDTOrderNam",
            method: "GET",
            responseType: "arraybuffer",
            params: { year: $scope.year_nam }
        }).then(
            function(response) {
                var blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var formattedDate = day + '-' + month + '-' + year;
                a.download = "ReportDoanhThuOrderTheoNam_" + $scope.year_nam + "_" + formattedDate + ".xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            function(error) {
                console.error("Lỗi khi tải xuống tệp Excel:", error);
            }
        );
    };

    $scope.downloadExcelDTOrderThang = function() {
        $http({
            url: "http://localhost:8080/rest/reportOrder/downloadExcelDTOrderThang",
            method: "GET",
            responseType: "arraybuffer",
            params: { year: $scope.monthNam, month: $scope.monthThang }
        }).then(
            function(response) {
                var blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var formattedDate = day + '-' + month + '-' + year;
                a.download = "ReportDoanhThuOrderTheoThang_" + $scope.monthThang + "_" + $scope.monthNam + "_" + formattedDate + ".xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            function(error) {
                console.error("Lỗi khi tải xuống tệp Excel:", error);
            }
        );
    };

    $scope.downloadExcelSLOrderNam = function() {
        $http({
            url: "http://localhost:8080/rest/reportOrder/downloadExcelSLOrderNam",
            method: "GET",
            responseType: "arraybuffer",
            params: { year: $scope.year_nam }
        }).then(
            function(response) {
                var blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var formattedDate = day + '-' + month + '-' + year;
                a.download = "ReportSoLuongOrderTheoNam_" + $scope.year_nam + "_" + formattedDate + ".xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            function(error) {
                console.error("Lỗi khi tải xuống tệp Excel:", error);
            }
        );
    };

    $scope.downloadExcelSLOrderThang = function() {
        $http({
            url: "http://localhost:8080/rest/reportOrder/downloadExcelSLOrderThang",
            method: "GET",
            responseType: "arraybuffer",
            params: { year: $scope.monthNam, month: $scope.monthThang }
        }).then(
            function(response) {
                var blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var formattedDate = day + '-' + month + '-' + year;
                a.download = "ReportSoLuongOrderTheoThang_" + $scope.monthThang + "_" + $scope.monthNam + "_" + formattedDate + ".xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            function(error) {
                console.error("Lỗi khi tải xuống tệp Excel:", error);
            }
        );
    };

    $scope.downloadExcelDTOrderTheoNgay = function() {
        var start = new Date($scope.startDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
        var end = new Date($scope.endDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
        $http({
            url: "http://localhost:8080/rest/reportOrder/downloadExcelDTOrderTheoNgay",
            method: "GET",
            responseType: "arraybuffer",
            params: { startDate: start, endDate: end }
        }).then(
            function(response) {
                var blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var formattedDate = day + '-' + month + '-' + year;
                a.download = "ReportDoanhThuOrder_" + start + "_to_" + end + "_" + formattedDate + ".xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            function(error) {
                console.error("Lỗi khi tải xuống tệp Excel:", error);
            }
        );
    };

    $scope.downloadExcelSLOrderTheoNgay = function() {
        var start = new Date($scope.startDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
        var end = new Date($scope.endDate).toLocaleDateString('en-GB').split('/').reverse().join('-');
        $http({
            url: "http://localhost:8080/rest/reportOrder/downloadExcelSLOrderTheoNgay",
            method: "GET",
            responseType: "arraybuffer",
            params: { startDate: start, endDate: end }
        }).then(
            function(response) {
                var blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var formattedDate = day + '-' + month + '-' + year;
                a.download = "ReportSoLuongOrder_" + start + "_to_" + end + "_" + formattedDate + ".xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            function(error) {
                console.error("Lỗi khi tải xuống tệp Excel:", error);
            }
        );
    };
});