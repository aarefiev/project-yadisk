import _ from 'lodash';
import axios from 'axios';
import Router from 'koa-router';

const url = 'https://cloud-api.yandex.net/v1/disk';
const ACCESS_TOKEN = 'AQAAAAASw-uZAATacCdE54upbkqUuIg0NlWpuBU';

export default (router) => {
  const defaultHeaders = {
    Authorization: 'OAuth AQAAAAASw-uZAADLW87y6hyutUC8iSy5glITcg0',
  };
  const defaultState = {
    diskItems: [],
    currentPathParts: ['disk:'],
  };

  const state = { ...defaultState };
  const headers = { ...defaultHeaders };

  const apiRouter = new Router();
  apiRouter
    .post('/authorize', async (ctx) => {
      // const { email, password } = ctx.request.body;
      const response = await axios.get(url, {
        headers: {
          Authorization: 'OAuth AQAAAAASw-uZAADLW87y6hyutUC8iSy5glITcg0',
        },
      });

      console.log(response.data);

      ctx.status = 200;
    })
    .get('/disk/(.*)*', async (ctx) => {
      const paramsPath = ctx.params['0'] || '';
      const { diskItems, currentPathParts } = state;
      const paramsPathParts = paramsPath.split('/')
        .filter(v => v !== '');
      const pathParts = [...currentPathParts, ...paramsPathParts, ''];
      const {
        data: { _embedded: { items } }
      } = await axios.get(`${url}/resources`, {
        params: {
          path: pathParts.join('/'),
        },
        headers,
      });

      // state.diskItems = [...diskItems, ...items];
      ctx.body = items;
      ctx.status = 200;
    });
    // .get('/channels', (ctx) => {
    //   ctx.body = Object.values(state.channels);
    //   ctx.status = 301;
    // })
    // .post('/channels', (ctx) => {
    //   const { data: { attributes: { name } } } = ctx.request.body;
    //   const channel = {
    //     name,
    //     removable: true,
    //     id: getNextId(),
    //   };
    //   state.channels.push(channel);
    //   ctx.status = 201;
    //   const data = {
    //     data: {
    //       type: 'channels',
    //       id: channel.id,
    //       attributes: channel,
    //     },
    //   };
    //   ctx.body = data;
    //
    //   // io.emit('newChannel', data);
    // })
    // .delete('/channels/:id', (ctx) => {
    //   const channelId = Number(ctx.params.id);
    //   state.channels = state.channels.filter(c => c.id !== channelId);
    //   state.messages = state.messages.filter(m => m.channelId !== channelId);
    //   ctx.status = 204;
    //   const data = {
    //     data: {
    //       type: 'channels',
    //       id: channelId,
    //     },
    //   };
    //   // io.emit('removeChannel', data);
    // })
    // .patch('/channels/:id', (ctx) => {
    //   const channelId = Number(ctx.params.id);
    //   const channel = state.channels.find(c => c.id === channelId);
    //
    //   const { attributes } = ctx.request.body.data;
    //   channel.name = attributes.name;
    //   ctx.status = 204;
    //   const data = {
    //     data: {
    //       type: 'channels',
    //       id: channelId,
    //       attributes: channel,
    //     },
    //   };
    //   // io.emit('renameChannel', data);
    // }
    // .get('/channels/:channelId/messages', (ctx) => {
    //   const messages = state.messages.filter(m => m.channelId === ctx.params.channelId);
    //   const resources = messages.map(m => ({
    //     type: 'channels',
    //     id: m.id,
    //     attributes: m,
    //   }));
    //   ctx.body = resources;
    // })
    // .post('/channels/:channelId/messages', (ctx) => {
    //   const { data: { attributes } } = ctx.request.body;
    //   const message = {
    //     ...attributes,
    //     channelId: Number(ctx.params.channelId),
    //     id: getNextId(),
    //   };
    //   state.messages.push(message);
    //   ctx.status = 201;
    //   const data = {
    //     data: {
    //       type: 'messages',
    //       id: message.id,
    //       attributes: message,
    //     },
    //   };
    //   ctx.body = data;
    //   // io.emit('newMessage', data);
    // });

  return router
    .get('root', '/disk/(.*)*', async (ctx) => {
      // const { 0: paramsPath } = ctx.params;
      // const { currentPath } = defaultState;
      //
      // if (typeof paramsPath !== 'undefined') {
      //   const filteredParamsPath = paramsPath.split('/')
      //     .filter(v => v !== '');
      //   state.currentPath = [...currentPath, ...filteredParamsPath];
      // } else {
      //   state.currentPath = currentPath;
      // }

      ctx.render('index');
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
