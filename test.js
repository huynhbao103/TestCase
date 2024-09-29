const { Builder, By, Key, until } = require('selenium-webdriver');

// Hàm hẹn giờ
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Mở trang tính toán
        await driver.get('https://testsheepnz.github.io/BasicCalculator.html');

        // Lựa chọn Build 4
        await driver.findElement(By.id('selectBuild')).sendKeys('Build 4');

        const testCases = [
            // Các trường hợp test
            { number1: '1', number2: '-1', operation: 'Add'},
            { number1: '0', number2: '1', operation: 'Add' },
            { number1: '-1', number2: '-1', operation: 'Add' },
            { number1: '1', number2: '1', operation: 'Add' },
            { number1: '0', number2: '-1', operation: 'Add' },
            { number1: '-1', number2: '0', operation: 'Add' },
            { number1: '1', number2: '0', operation: 'Add' },
            { number1: '0', number2: '0', operation: 'Add' },
            { number1: '-1.1', number2: '1.1', operation: 'Add' },
            { number1: '1.1', number2: '-1.1', operation: 'Add' },
            { number1: '0.0', number2: '1.1', operation: 'Add' },
            { number1: '-1.1', number2: '-1.1', operation: 'Add' },
            { number1: '1.1', number2: '1.0', operation: 'Add' },
            { number1: '1.1', number2: '0.0', operation: 'Add' },
            { number1: '0.0', number2: '-1.1', operation: 'Add' },
            { number1: '-1.1', number2: '0.0', operation: 'Add' },
            { number1: '0.0', number2: '0.0', operation: 'Add' },
            { number1: '-1.1', number2: '1.1', operation: 'Add' },
            { number1: '-999999999', number2: '-999999999', operation: 'Add' },
            { number1: '999999999', number2: '999999999', operation: 'Add' },
            { number1: '999999999', number2: '-999999999', operation: 'Add' },
            { number1: '-999999999', number2: '999999999', operation: 'Add' },
            { number1: '9', number2: '', operation: 'Add' },
            { number1: '', number2: '8', operation: 'Add' },
            { number1: '-999999999', number2: '5', operation: 'Add' },
            { number1: '-999999999', number2: '-6', operation: 'Add' },
            { number1: '999999999', number2: '7', operation: 'Add' },
            { number1: '999999999', number2: '-8', operation: 'Add' },
            { number1: 'abc', number2: '9', operation: 'Add' },
            { number1: 'xyz', number2: '-9', operation: 'Add' },
            { number1: 'ghi', number2: '999999999', operation: 'Add' },
            { number1: 'def', number2: '-999999999', operation: 'Add' },
            { number1: '5', number2: 'uvw', operation: 'Add' },
            { number1: '999999999', number2: 'rst', operation: 'Add' },
            { number1: '-999999999', number2: 'lmn', operation: 'Add' },
            { number1: '-6', number2: 'opq', operation: 'Add' },
            { number1: 'abc123', number2: '5', operation: 'Add' },
            { number1: 'xyz456', number2: '-5', operation: 'Add' },
            { number1: 'ghi789', number2: '999999999', operation: 'Add' },
            { number1: 'def012', number2: '-999999999', operation: 'Add' },
            { number1: '8', number2: 'a123', operation: 'Add' },
            { number1: '999999999', number2: 'a123', operation: 'Add' },
            { number1: '-999999999', number2: 'a123', operation: 'Add' },
            { number1: '-7', number2: 'a123', operation: 'Add' },
            { number1: '9', number2: '', operation: 'Add' },
            { number1: '999999999', number2: '', operation: 'Add' },
            { number1: '-5', number2: '', operation: 'Add' },
            { number1: '-999999999', number2: '', operation: 'Add' },
            { number1: '', number2: '6', operation: 'Add' },
            { number1: '', number2: '999999999', operation: 'Add' },
            { number1: '', number2: '-3', operation: 'Add' },
            { number1: '', number2: '-999999999', operation: 'Add' },
        ];
        for (const testCase of testCases) {
            await driver.findElement(By.id('clearButton')).click(); // Nhấn nút Clear

            // Điền dữ liệu vào các ô
            await driver.findElement(By.id('number1Field')).clear(); // Xóa ô số 1 trước khi nhập
            await driver.findElement(By.id('number1Field')).sendKeys(testCase.number1);
            await sleep(1000); // Thời gian trễ 1 giây giữa các lần nhập

            await driver.findElement(By.id('number2Field')).clear(); // Xóa ô số 2 trước khi nhập
            await driver.findElement(By.id('number2Field')).sendKeys(testCase.number2);
            await sleep(1000); // Thời gian trễ 1 giây giữa các lần nhập

            // Chọn phép toán
            await driver.findElement(By.id('selectOperationDropdown')).sendKeys(testCase.operation);
            await sleep(1000); // Thời gian trễ 1 giây giữa các lần nhập

            // Bấm nút Calculate
            await driver.findElement(By.id('calculateButton')).click();

            // Đợi kết quả xuất hiện và lấy kết quả
            let result = await driver.wait(until.elementLocated(By.id('numberAnswerField')), 30000);
            let value = await result.getAttribute('value');
            console.log(`${value}`);
        }

    } finally {
        await driver.quit();
    }
}

runTests();
