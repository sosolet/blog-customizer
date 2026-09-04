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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { useState, useRef, SyntheticEvent } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	applyStatePage: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	applyStatePage,
}: ArticleParamsFormProps) => {
	const defaultState = useRef<ArticleStateType>(defaultArticleState);
	const ref = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(
		defaultState.current
	);

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: ref,
		onChange: toggleIsOpen,
	});

	const updateFormState = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
	};

	const resetForm = () => {
		setFormState(defaultState.current);
		applyStatePage(defaultState.current);
	};

	const applyStateForm = (event: SyntheticEvent) => {
		event.preventDefault();
		applyStatePage(formState);
	};

	return (
		<div ref={ref}>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={applyStateForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={updateFormState('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={updateFormState('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={updateFormState('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={updateFormState('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={updateFormState('contentWidth')}
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
		</div>
	);
};
