import fs from 'node:fs';
import chalk from 'chalk';
import { connectDB } from '../../db/connect.js';
import { RentalOfferDbo } from '../../db/rentalOfferDbo.js';

export const importData = async (file: string) => {
  try {
    await connectDB();

    if (!fs.existsSync(file)) {
      console.error(chalk.red('❌ Файл не существует!'));
      return;
    }

    const data = fs.readFileSync(file, 'utf-8');
    if (!data) {
      console.error(chalk.red('❌ Ошибка чтения файла!'));
      return;
    }
    const lines = data.split('\n').slice(1); // Пропускаем заголовок
    const offers = lines.filter((line) => line).map((line) => {
      const [
        name, description, publishDate, city, previewImage, photos, isPremium,
        isFavorite, rating, type, rooms, guests, price, amenities, author, coordinates
      ] = line.split('\t');

      return {
        name, description, publishDate, city, previewImage,
        photos: photos.split(';'), isPremium: isPremium === 'Да',
        isFavorite: isFavorite === 'Да', rating: parseFloat(rating), type,
        rooms: parseInt(rooms, 10), guests: parseInt(guests, 10),
        price: parseInt(price, 10), amenities: amenities.split(';'),
        author, coordinates
      };
    });

    await RentalOfferDbo.insertMany(offers);
    console.log(chalk.green('✅ Данные успешно импортированы!'));
  } catch (error) {
    console.error(chalk.red('❌ Ошибка при импорте данных:'), error);
  }
};
