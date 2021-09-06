const jsonServer = require('json-server');
const auth = require('json-server-auth');
const queryString = require('query-string');
const moment = require('moment');

const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');

const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = moment().valueOf();
    req.body.updatedAt = moment().valueOf();
  }

  if (req.method === 'PUT') {
    req.method = 'PATCH';
  }

  if (req.method === 'PATCH') {
    req.body.updatedAt = moment().valueOf();
  }

  next()
})

router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers["x-total-count"];
  if (req.method === "GET" && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedOriginalUrl.query);
    const results = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },

    };
    return res.jsonp(results);
  }
  return res.jsonp(res.locals.data);
};

server.use(auth);
server.use(router);
server.listen(3001);
