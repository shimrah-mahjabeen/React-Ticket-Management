import Loadable from 'react-loadable';

export const Tickets = Loadable({
  loader: () => import("../views/Tickets/Tickets"),
  loading: Loading,
  timeout: 10000,
});
