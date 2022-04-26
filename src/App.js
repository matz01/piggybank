import "./App.scss";
import { createContext, useEffect, useState } from "react";
import { Typology } from "./Typology";
import { getWeek } from "./utils/getWeek";
import { AddAmount } from "./AddAmount";
import { getTransactions } from './utils/getTransactions';
import { Monthly } from './Monthly';

export const AppContext = createContext({});

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

	const openSituation = () => {
		setView("monthly");
	};

	return (
		<AppContext.Provider value={{openAdd, openCategory, openSituation, budget}}>
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
				{view === "monthly" && budget !== undefined &&
					<Monthly/>
				}

			</div>
		</AppContext.Provider>
	);
}

export default App;
