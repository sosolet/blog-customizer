import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { useState, useRef, SyntheticEvent } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	applyStatePage: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	applyStatePage,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const defaultState = useRef(defaultArticleState);
	const [fontFamilyOption, setFontFamilyOption] = useState(
		defaultState.current.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState(
		defaultState.current.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(defaultState.current.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultState.current.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultState.current.contentWidth
	);

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const changeFontFamily = (option: OptionType) => {
		setFontFamilyOption(option);
	};

	const changeFontSize = (option: OptionType) => {
		setFontSizeOption(option);
	};

	const changeFontColor = (option: OptionType) => {
		setFontColor(option);
	};

	const changeBackgroundColor = (option: OptionType) => {
		setBackgroundColor(option);
	};

	const changeContentWidth = (option: OptionType) => {
		setContentWidth(option);
	};

	const resetForm = () => {
		setFontFamilyOption(defaultState.current.fontFamilyOption);
		setFontSizeOption(defaultState.current.fontSizeOption);
		setFontColor(defaultState.current.fontColor);
		setBackgroundColor(defaultState.current.backgroundColor);
		setContentWidth(defaultState.current.contentWidth);
		applyStatePage(defaultState.current);
	};

	const applyStateForm = (event: SyntheticEvent) => {
		event.preventDefault();
		applyStatePage({
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={applyStateForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={changeFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={changeFontSize}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={changeFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={changeBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={changeContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
