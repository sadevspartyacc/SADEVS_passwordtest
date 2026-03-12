const passwordInput = document.getElementById('password');
const display = document.querySelector('.weakness');

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (!val) { display.innerText = ''; return; }

    let charsetSize = 0;
    if (/[a-z]/.test(val)) charsetSize += 26;
    if (/[A-Z]/.test(val)) charsetSize += 26;
    if (/[0-9]/.test(val)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(val)) charsetSize += 32;

    let combinations = BigInt(charsetSize) ** BigInt(val.length);
    
    let hashesPerSecond;
    if (val.length <= 10) {
        hashesPerSecond = BigInt(10000000000); 
    } else {
        hashesPerSecond = BigInt(1000000); 
    }

    let totalSeconds = combinations / hashesPerSecond;

    if (val.length < 5) {
        display.innerText = "Crack time: Instant";
        return;
    }

    let seconds = totalSeconds;
    const years = seconds / 31536000n;
    seconds %= 31536000n;
    const days = seconds / 86400n;
    seconds %= 86400n;
    const hours = seconds / 3600n;
    seconds %= 3600n;
    const mins = seconds / 60n;
    const secs = seconds % 60n;

    let result = [];
    if (years > 0n) result.push(`${years}y`);
    if (days > 0n) result.push(`${days}d`);
    if (hours > 0n) result.push(`${hours}h`);
    if (mins > 0n) result.push(`${mins}m`);
    if (secs > 0n || result.length === 0) result.push(`${secs}s`);

    display.innerText = "Crack time: " + result.join(' ');
});
