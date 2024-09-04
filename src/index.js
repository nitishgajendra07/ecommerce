const express = require('express')
const dotenv = require('dotenv');
const { connectToDB } = require('./db/connectToDB');
const { serverListeningMessage, responseMessage } = require('./constants');
const { userRouter } = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const { productRouter } = require('./routes/product.route');
const { categoryRouter } = require('./routes/category.route');
const { adminRouter } = require('./routes/admin.route');


dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.all("*", (req, res) => {
    res.status(404).json({ error: responseMessage.pageNotFound });
});

connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`${serverListeningMessage} ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(customErrorMessage.mongoDBFail, err);
    })