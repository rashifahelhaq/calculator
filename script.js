        // Variabel global untuk menyimpan ekspresi matematika yang sedang dibangun
        let currentExpression = '0'; 
        // Variabel untuk melacak apakah tombol operator terakhir yang diklik
        let isOperatorClicked = false;
        // Variabel untuk melacak apakah hasil perhitungan sebelumnya sudah ditampilkan
        let isResultDisplayed = false;

        // Fungsi untuk memperbarui tampilan kalkulator
        function updateDisplay() {
            // Dapatkan elemen display berdasarkan ID
            const display = document.getElementById('display');
            // Pastikan tampilan tidak kosong; jika kosong, tampilkan '0'
            display.innerText = currentExpression || '0'; 
        }

        // Fungsi yang dipanggil saat tombol angka (0-9) diklik
        function appendNumber(number) {
            // Jika hasil sebelumnya baru saja ditampilkan, mulai ekspresi baru
            if (isResultDisplayed) {
                currentExpression = String(number);
                isResultDisplayed = false;
            // Jika ekspresi saat ini hanya '0', ganti dengan angka baru
            } else if (currentExpression === '0') {
                currentExpression = String(number);
            // Tambahkan angka baru ke ekspresi yang ada
            } else {
                currentExpression += number;
            }
            // Reset status operator
            isOperatorClicked = false; 
            // Perbarui tampilan
            updateDisplay();
        }

        // Fungsi yang dipanggil saat tombol desimal (.) diklik
        function appendDecimal() {
            // Jika ekspresi saat ini adalah hasil perhitungan, mulai ekspresi baru dengan '0.'
            if (isResultDisplayed) {
                currentExpression = '0.';
                isResultDisplayed = false;
            } 
            
            // Cek apakah angka terakhir dalam ekspresi sudah mengandung titik desimal
            // Ini mencegah dua titik desimal dalam satu angka (misalnya: 5.5.5)
            const parts = currentExpression.split(/[\+\-\*\/]/);
            const lastPart = parts[parts.length - 1];

            if (!lastPart.includes('.')) {
                // Tambahkan titik desimal hanya jika belum ada
                currentExpression += '.';
            }

            // Perbarui tampilan
            updateDisplay();
        }

        // Fungsi yang dipanggil saat tombol operator (+, -, *, /) diklik
        function appendOperator(operator) {
            // Reset status tampilan hasil
            isResultDisplayed = false; 
            
            // Jika tombol operator terakhir kali sudah diklik, 
            // ganti operator yang sudah ada di akhir ekspresi dengan operator yang baru
            if (isOperatorClicked) {
                // Hapus operator terakhir dan tambahkan yang baru
                currentExpression = currentExpression.slice(0, -1) + operator;
            } else {
                // Tambahkan operator ke akhir ekspresi
                currentExpression += operator;
            }

            // Atur status operator
            isOperatorClicked = true; 
            // Perbarui tampilan
            updateDisplay();
        }

        // Fungsi yang dipanggil saat tombol Clear (C) diklik
        function clearDisplay() {
            // Reset semua variabel ke kondisi awal
            currentExpression = '0';
            isOperatorClicked = false;
            isResultDisplayed = false;
            // Perbarui tampilan
            updateDisplay();
        }
        
        // Fungsi baru untuk menghapus karakter terakhir (Delete / Backspace)
        function deleteLast() {
            // Jika ekspresi saat ini adalah hasil (setelah tombol =), jangan hapus
            if (isResultDisplayed) return;

            // Hapus karakter terakhir dari ekspresi
            currentExpression = currentExpression.slice(0, -1);

            // Jika ekspresi menjadi kosong, reset ke '0'
            if (currentExpression.length === 0) {
                currentExpression = '0';
            }
            
            // Perbarui tampilan
            updateDisplay();
        }

        // Fungsi baru untuk menerapkan persentase
        function applyPercentage() {
            try {
                // Evaluasi ekspresi saat ini untuk mendapatkan nilai terakhir
                // Misalnya, jika '100+50', kita hanya ingin 50 yang dihitung persentasenya
                const parts = currentExpression.split(/([\+\-\*\/])/).filter(p => p.trim() !== '');
                if (parts.length === 0) return;

                // Ambil nilai terakhir (yang akan dijadikan persen)
                const lastValue = parts[parts.length - 1];
                let numericValue = parseFloat(lastValue);

                if (isNaN(numericValue)) return;

                // Hitung persentase (dibagi 100)
                const percentageValue = numericValue / 100;

                // Ganti nilai terakhir dalam ekspresi dengan hasil persentase
                // Hapus bagian terakhir dari ekspresi asli
                const newExpression = currentExpression.slice(0, currentExpression.lastIndexOf(lastValue));
                
                // Tambahkan nilai persentase yang sudah dihitung (dibatasi presisi)
                currentExpression = newExpression + String(Number(percentageValue.toFixed(10)));

            } catch (error) {
                // Tangani kesalahan jika ekspresi tidak valid
                currentExpression = 'Error';
            }
            
            isResultDisplayed = false;
            updateDisplay();
        }


        // Fungsi yang dipanggil saat tombol Sama Dengan (=) diklik
        function calculate() {
            try {
                // Menghitung hasil dari ekspresi saat ini. 
                // Fungsi eval() digunakan untuk mengevaluasi string sebagai kode JavaScript.
                // Penggantian 'x' dengan '*' dilakukan untuk perhitungan.
                const result = eval(currentExpression.replace(/x/g, '*'));
                
                // Jika hasilnya tak terhingga atau NaN (Not a Number), anggap sebagai Error
                if (!isFinite(result)) {
                    currentExpression = 'Error: Pembagian dengan nol';
                } else {
                    // FIX: Gunakan Number().toFixed() untuk membatasi presisi maksimal (10 desimal)
                    // dan menghilangkan nol yang tidak perlu (misalnya 5.000 menjadi 5), sehingga format angka rapih.
                    currentExpression = String(Number(result.toFixed(10))); 
                }

            } catch (error) {
                // Jika ada kesalahan sintaks (misal: 5 + *), tampilkan Error
                console.error("Kesalahan perhitungan:", error);
                currentExpression = 'Error: Ekspresi tidak valid';
            }

            // Atur status tampilan hasil dan operator
            isResultDisplayed = true;
            isOperatorClicked = false; 
            // Perbarui tampilan
            updateDisplay();
        }
