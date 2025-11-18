
        //  Jelaskan Kodingan ini apa 
        document.addEventListener('DOMContentLoaded', function() {
            
            //  Jelaskan Kodingan ini apa 
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  Jelaskan Kodingan ini apa 
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              Jelaskan Kodingan ini apa 
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Jelaskan Kodingan ini apa 
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function calculateResult() {
                //  Jelaskan Kodingan ini apa 
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  Jelaskan Kodingan ini apa 
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Jelaskan Kodingan ini apa 
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa 
                    ); 
                    
                    //  Jelaskan Kodingan ini apa 
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); //  Jelaskan Kodingan ini apa 
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Jelaskan Kodingan ini apa 
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  Jelaskan Kodingan ini apa 
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Jelaskan Kodingan ini apa 
                    switch(value) {
                        case 'C':
                            //  Jelaskan Kodingan ini apa 
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Jelaskan Kodingan ini apa 
                            deleteLastChar();
                            break;
                        case '=':
                            //  Jelaskan Kodingan ini apa 
                            calculateResult();
                            break;
                        default:
                            //  Jelaskan Kodingan ini apa 
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //  Jelaskan Kodingan ini apa 
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });
        });
