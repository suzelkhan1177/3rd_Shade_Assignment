const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const channelPartnerRouter = require('./routes/channelPartnerRouter');
const leadsRouter = require('./routes/leadRouter');

require("./config/mysql2");
require('./models/index');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());


app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/channelPartner', channelPartnerRouter);
app.use('/api/v1/leads', leadsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
