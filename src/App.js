import "./App.scss";
import {ThemeProvider} from 'styled-components';
import { createContext, useEffect, useState } from "react";
import { Typology } from "./Typology";
import { getWeek } from "./utils/getWeek";
import { AddAmount } from "./AddAmount";
import { getTransactions } from './utils/getTransactions';
import { Monthly } from './Monthly';

export const AppContext = createContext({});

const theme = {
	text: '#546E7A'
};

function App() {
	const [view, setView] = useState("category");
	const [budget, setBudget] = useState();
	const [scope, setScope] = useState();

	const weekNumber = getWeek();
	useEffect(() => {
		getTransactions(setBudget).then(() => {});
	}, []);

	const openAdd = (id) => {
		setScope(id);
		setView("add");
	};

	const openCategory = () => {
		setView("category");
	};

	return (
		<AppContext.Provider value={{openAdd, openCategory, budget}}>
			<ThemeProvider theme={theme}>
				<div className="app">
					{view === "add" && budget !== undefined &&
						<AddAmount
							id={scope}
							weekNumber={weekNumber}
						/>
					}
					{view === "category" && budget !== undefined &&
						<Typology/>
					}

				</div>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
