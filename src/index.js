import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';
import ShowResource from "./Components/Resources";
import Resources from "./Components/Resources";
import Proposals from "./Components/Proposals";
import ShowProposal from "./Components/Proposals/ShowProposal";
import Admin from "./Components/Admin";
import CategoryAdmin from "./Components/Admin/CategoryAdmin";
import Matches from "./Components/Matchs";
import ShowMatch from "./Components/Matchs/ShowMatch";
import store from "./Redux/store";
import UnitsAdmin from "./Components/Admin/UnitsAdmin";
import NewResource from "./Components/Resources/NewResource";

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
                        element: <NewResource />,
                        // errorElement: <ErrorBoundary/>
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

// function ErrorBoundary() {
//     return redirect("/")
// }

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
