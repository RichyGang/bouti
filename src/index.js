import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';
import ShowResource from "./Resources";
import Resources from "./Resources";
import Proposals from "./Proposals";
import ShowProposal from "./Proposals/ShowProposal";
import Admin from "./Admin";
import CategoryAdmin from "./Admin/CategoryAdmin";
import Matches from "./Matchs";
import ShowMatch from "./Matchs/ShowMatch";
import store from "./Redux/store";
import UnitsAdmin from "./Admin/UnitsAdmin";
import NewResource from "./Resources/NewResource";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <App/>,
        children: [
            {
                path: "resources",
                element: <Resources/>,
                children: [
                    {
                        path: "resources/:resourceId",
                        element: <ShowResource />
                    },
                    {
                        path: "resources/new",
                        element: <NewResource />
                    }
                ]
            },
            {
                path: "proposals",
                element: <Proposals/>,
                children: [
                    {
                        path: "proposals/:proposalId",
                        element: <ShowProposal />
                    }
                ]
            },
            {
                path: "matches",
                element: <Matches/>,
                children: [
                    {
                        path: "matches/:matchId",
                        element: <ShowMatch/>
                    }
                ]
            },
            {
                path: "admin",
                element: <Admin/>,
                children: [
                    {
                        path: "admin/categories",
                        element: <CategoryAdmin/>
                    },
                    {
                        path: "admin/units",
                        element: <UnitsAdmin/>
                    }
                ]
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}>
              <App />
          </RouterProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
