// Lấy các phần tử HTML
const audio = document.getElementById('bg-music');
const musicButton = document.getElementById('music-control');

// Biến trạng thái để theo dõi nhạc đang chạy hay không
let isPlaying = false;

// Hàm xử lý khi nhấn nút
function togglePlay() {
    if (isPlaying) {
        // Nếu đang chạy, thì dừng lại
        audio.pause();
        musicButton.innerHTML = '▶️'; // Đổi biểu tượng
        isPlaying = false;
    } else {
        // Nếu đang dừng, thì chạy
        // Dùng .play() để bắt đầu phát nhạc
        audio.play().catch(error => {
            // Xử lý lỗi nếu trình duyệt chặn tự động phát
            console.error("Lỗi phát nhạc: ", error);
            //alert("Xin lỗi, trình duyệt của bạn chặn tự động phát nhạc. Vui lòng bấm lại nút 'Play Music' lần nữa.");
            musicButton.innerHTML = '▶️';
        });
        musicButton.innerHTML = '⏸️'; // Đổi biểu tượng
        isPlaying = true;
    }
}

// Gán sự kiện click cho nút
musicButton.addEventListener('click', togglePlay);

// --- LƯU Ý QUAN TRỌNG VỀ TỰ ĐỘNG PHÁT ---
// Các trình duyệt hiện đại (Chrome, Safari...) thường KHÔNG cho phép
// tự động phát âm thanh nếu người dùng chưa tương tác (chưa click).
// Script này sẽ yêu cầu người dùng CLICK VÀO NÚT để kích hoạt nhạc.