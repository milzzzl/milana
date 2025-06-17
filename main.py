from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

bot = Bot(token="7785707404:AAHnV3drmtN7EatY3PjqHz_lMxTtvr6x1kg")
dp = Dispatcher()

@dp.message(Command(commands=["start"]))
async def start(message: types.Message):
    await message.answer("Вас приветствует бот Клик Клак!"
                          "Начни с первого клика и смотрите,как растет ваш успех с каждым нажатием."
                          "Накапливайте новые ресурсы и открывайте новые возможности в нашем проекте!")

dp.run_polling(bot)

