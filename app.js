const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Обработка GET-запросов на главной странице
app.get('/', async (req, res) => {
    // Получаем реальный IP-адрес пользователя
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log("IP адрес пользователя: ", ipAddress);  // Выводим IP в консоль

    try {
        // Получаем данные о геолокации через ipinfo.io
        const response = await axios.get(`http://ipinfo.io/${ipAddress}/json`);
        const locationData = response.data;

        // Выводим геолокацию в консоль
        console.log("Геолокация:", locationData);

        res.send('IP-адрес и геолокация выведены в терминал.');
    } catch (error) {
        res.send('Не удалось получить геолокацию.');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
