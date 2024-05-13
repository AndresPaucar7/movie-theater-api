const express = require('express');
const userRouter = require('./router/userRouter');
const showRouter = require('./router/showsRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/shows', showRouter); 

const port = 3000;

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});