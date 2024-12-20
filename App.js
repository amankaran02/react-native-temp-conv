import { s } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ImageBackground } from "react-native";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { Input } from "./components/input/Input";
import { use, useEffect, useState } from "react";
import { DisplayTemperature } from "./components/input/DisplayTemperature";
import {
	UNITS,
	getOppositeUnit,
	convertTemperatureTo,
	isIceTemperature,
} from "./utils/temperature";
import { ButtonConvert } from "./components/input/ButtonConvert";

export default function App() {
	const [inputValue, setInputValue] = useState(0);
	const [currentUnit, setCurrentUnit] = useState("°C");
	const [currentBackground, setCurrentBackground] = useState(coldBackground);
	const oppositeUnit = getOppositeUnit(currentUnit);

	useEffect(() => {
		if (isIceTemperature(inputValue, currentUnit)) {
			setCurrentBackground(coldBackground);
		} else {
			setCurrentBackground(hotBackground);
		}
	}, [inputValue, currentUnit]);

	function getConvertedTemperature() {
		if (isNaN(inputValue)) {
			return "";
		} else {
			return convertTemperatureTo(
				inputValue,
				getOppositeUnit(currentUnit)
			).toFixed(1);
		}
	}
	return (
		<ImageBackground style={s.backgroundImage} source={currentBackground}>
			<SafeAreaProvider>
				<SafeAreaView style={s.root}>
					<View style={s.workspace}>
						<DisplayTemperature
							unit={oppositeUnit}
							temperature={getConvertedTemperature()}
						/>
						<Input
							unit={currentUnit}
							onChange={setInputValue}
							defaultValue={0}
						/>
						<ButtonConvert
							onPress={() => {
								setCurrentUnit(oppositeUnit);
							}}
							unit={currentUnit}
						/>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		</ImageBackground>
	);
}
