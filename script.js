// =======================================================
// 🎶 PHẦN 1: CODE ĐIỀU KHIỂN NHẠC 🎶
// =======================================================

// Lấy các phần tử HTML
const audio = document.getElementById('bg-music');
const musicButton = document.getElementById('music-control');
let isPlaying = false;

// Hàm xử lý khi nhấn nút Play/Pause
function togglePlay() {
    if (isPlaying) {
        // Dừng nhạc
        audio.pause();
        musicButton.innerHTML = '▶️'; // Đổi biểu tượng sang Play
        isPlaying = false;
    } else {
        // Chạy nhạc
        audio.play()
            .then(() => {
                // CHỈ CẬP NHẬT TRẠNG THÁI KHI PHÁT THÀNH CÔNG
                musicButton.innerHTML = '⏸️'; // Đổi biểu tượng sang Pause
                isPlaying = true;
            })
            .catch(error => {
                // Xử lý lỗi (ví dụ: AbortError, hoặc bị chặn tự động phát)
                if (error.name !== "AbortError") {
                    console.error("Lỗi phát nhạc:", error);
                    alert("Trình duyệt chặn tự động phát nhạc. Vui lòng bấm lại nút 'Play' để kích hoạt.");
                }
                // Giữ nguyên isPlaying = false vì nhạc không chạy
                musicButton.innerHTML = '▶️';
            });
    }
}

// Gán sự kiện click cho nút
if (musicButton) {
    musicButton.addEventListener('click', togglePlay);
}


// =======================================================
// ❄️ PHẦN 2: CODE HIỆU ỨNG TUYẾT RƠI ❄️
// (Sử dụng document.createElement để khắc phục lỗi)
// =======================================================

// Cấu hình tuyết
var snowMax = 40; // Số lượng hạt tuyết tối đa
var snowColor = "#FFFFFF";
var snowLetter = "❅"; // Hình dạng tuyết (dấu chấm tròn)
var snowSpeed = 0.05; // Tốc độ rơi (giá trị càng lớn càng rơi nhanh)
var snowMaxSize = 15; // Kích thước lớn nhất (pt)
var snowMinSize = 8; // Kích thước nhỏ nhất (pt)

var snow = []; // Mảng chứa các đối tượng tuyết
var marginBottom;
var marginRight;

// Hàm tạo số ngẫu nhiên trong phạm vi
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm khởi tạo tuyết (TẠO CÁC PHẦN TỬ <span>)
function initSnow() {
    // 1. Cập nhật giới hạn khung nhìn
    resizeSnow();

    // 2. Tạo các hạt tuyết
    for (var i = 0; i <= snowMax; i++) {
        var size = randomRange(snowMinSize, snowMaxSize);
        var x = randomRange(0, marginRight);
        var y = randomRange(0, marginBottom);
        
        // **KHẮC PHỤC LỖI:** Sử dụng document.createElement thay vì document.write
        var snowElement = document.createElement('span');
        snowElement.id = 's' + i;
        snowElement.innerHTML = snowLetter;
        
        // Thiết lập CSS cho hạt tuyết
        snowElement.style.cssText = `
            position: absolute; 
            top: ${y}px; 
            left: ${x}px; 
            font-size: ${size}pt; 
            color: ${snowColor}; 
            font-family: Times; 
            z-index: 1000; 
            cursor: default;
        `;
        
        // Thêm hạt tuyết vào body một cách an toàn
        document.body.appendChild(snowElement); 
        
        // Lưu trữ thông tin tuyết vào mảng
        snow[i] = {
            element: snowElement, // Lưu trữ phần tử DOM
            x: x,
            y: y,
            size: size,
            speed: size * snowSpeed 
        };
    }

    // 3. Bắt đầu di chuyển tuyết
    moveSnow();
}

// Hàm cập nhật giới hạn màn hình (đảm bảo tuyết không rơi ngoài khung)
function resizeSnow() {
    marginBottom = document.body.scrollHeight;
    marginRight = document.body.clientWidth - 15; 
}

// Hàm di chuyển tuyết (TẠO HIỆU ỨNG RƠI)
function moveSnow() {
    for (var i = 0; i <= snowMax; i++) {
        // Cập nhật vị trí Y (rơi xuống)
        if (snow[i].element) { // Đảm bảo phần tử tồn tại
            snow[i].y += snow[i].speed;

            // Nếu tuyết chạm đáy, đưa nó lên đầu ngẫu nhiên
            if (snow[i].y >= marginBottom) {
                snow[i].y = 0;
                snow[i].x = randomRange(0, marginRight); 
            }

            // Cập nhật vị trí X và Y trên màn hình
            snow[i].element.style.top = snow[i].y + 'px';
            snow[i].element.style.left = snow[i].x + 'px';
        }
    }

    // Lặp lại hàm moveSnow sau mỗi 50ms
    setTimeout(moveSnow, 50); 
}

// =======================================================
// 🚀 PHẦN 3: GỌI HÀM KHỞI TẠO KHI TẢI TRANG 🚀
// =======================================================

window.onload = function() {
    initSnow();
    // Các logic khác có thể thêm vào đây
};

// Cập nhật lại giới hạn khi thay đổi kích thước cửa sổ
window.onresize = resizeSnow;