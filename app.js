const mqtt = require('mqtt');
require("dotenv").config();

// Konfigurasi broker MQTT
const brokerUrl = `wss://${process.env.URL}`
const options = {
    username: process.env.USER,
    password: process.env.PASSWORD
};
const topic = process.env.TOPIC

// Buat koneksi MQTT dengan opsi
const client = mqtt.connect(brokerUrl, options);

// Tangani ketika koneksi terbuka
client.on('connect', function () {
    console.log('Terhubung ke broker MQTT');

    // Mulai mengirim data setiap 3 detik
    setInterval(() => {
        // Bangkitkan data random 2 digit
        const randomNumber = Math.floor(Math.random() * 90) + 10;

        // Kirim data ke topik MQTT
        client.publish(topic, randomNumber.toString(), function (err) {
            if (err) {
                console.error('Gagal mengirim pesan:', err);
            } else {
                console.log('Pesan berhasil dikirim:', randomNumber);
            }
        });
    }, 1000);
});

// Tangani kesalahan
client.on('error', function (error) {
    console.error('Terjadi kesalahan:', error);
});
