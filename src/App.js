import "./App.scss";
import { ThemeProvider } from 'styled-components';
import { createContext, useEffect, useState } from "react";
import { Categories } from "./Categories";
import { getWeek } from "./utils/getWeek";
import { AddAmount } from "./AddAmount";
import { getTransactions } from './utils/getTransactions';
import { Recap } from './Recap';
import { StyledPage } from './StyledPage';

export const AppContext = createContext({});

export const SECTIONS = {
	CATEGORY: "category",
	ADD: "add",
	RECAP: "recap"
};

const theme = {
	text: '#164E63',
	mainColor: '#CFD8DC'
};

function App() {
	const [view, setView] = useState("category");
	const [budget, setBudget] = useState();
	const [scope, setScope] = useState();

	const weekNumber = getWeek();
	useEffect(() => {
		getTransactions(setBudget).then(() => {
		});
	}, []);

	const openAdd = (id) => {
		setScope(id);
		setView(SECTIONS.ADD);
	};

	const openSection = (section) => {
		setView(section);
	};

	return (
		<AppContext.Provider value={{ openAdd, openSection, budget }}>
			<ThemeProvider theme={theme}>
				<div className="app">

						{view === SECTIONS.ADD && budget !== undefined &&
							<AddAmount
								id={scope}
								weekNumber={weekNumber}
							/>
						}
						{view === SECTIONS.CATEGORY && budget !== undefined &&
							<Categories/>
						}
						{view === SECTIONS.RECAP &&
							<Recap/>
						}

				</div>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
