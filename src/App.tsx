import { useEffect, useState } from 'react';
import no from './assets/1.png';
import yes from './assets/2.png';
import broken from './assets/done.png';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getImage = (status: 'no' | 'yes' | 'broken') => {
	switch (status) {
		case 'no':
			return <img draggable={false} src={no} alt='' />;
		case 'yes':
			return <img draggable={false} src={yes} alt='' />;
		case 'broken':
			return <img draggable={false} src={broken} alt='' />;
	}
};

const randomAud = () => require(`./assets/break${Math.floor(Math.random() * 6) + 1}.mp3`);

const getMaxHits = () => {
	const arr: number[] = [32, 16, 45, 23, 17, 8, 19, 31];
	return arr[Math.floor(Math.random() * arr.length)];
};

const App = () => {
	const [brokenDisk, setBrokenDisk] = useState(0);
	const [audiencia, setAudiencia] = useState(0);

	const [count, setCount] = useState(0);
	const [status, setStatus] = useState<'no' | 'yes' | 'broken'>('no');

	useEffect(() => {
		count > getMaxHits() && setStatus('broken');
	}, [count]);

	useEffect(() => {
		if (status === 'broken') {
			new Audio(require('./assets/broken.mp3')).play();
			setBrokenDisk((d) => d + 1);
			setAudiencia((a) => a + Math.floor(Math.random() * 10));
		} else {
			status === 'yes' && new Audio(randomAud()).play();
		}
	}, [status]);

	return (
		<div className='flex flex-col select-none'>
			<div className='flex md:flex-row flex-col justify-between items-center px-4 py-2 space-x-4 bg-slate-800'>
				<div className='flex items-center'>
					<svg
						className='fill-slate-100 w-20 h-20 ml-4 mr-2'
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M14.25 13.5C14.6642 13.5 15 13.1642 15 12.75C15 12.3358 14.6642 12 14.25 12C13.8358 12 13.5 12.3358 13.5 12.75C13.5 13.1642 13.8358 13.5 14.25 13.5ZM2.23739 10.8435C2.08076 11.2089 2 11.6024 2 12V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V12C18 11.6163 17.9394 11.2308 17.8103 10.8618C16.9887 8.51197 15.9274 6.25021 15.356 5.08776C15.0231 4.41071 14.335 4 13.5931 4H6.48913C5.68907 4 4.966 4.47679 4.65084 5.21215L2.23739 10.8435ZM6.48913 5H13.5931C13.9664 5 14.2994 5.20511 14.4586 5.52894C14.9283 6.48449 15.7287 8.18365 16.4466 10.05C16.303 10.0173 16.1535 10 16 10H4C3.88956 10 3.78121 10.009 3.67563 10.0262L5.56998 5.60608C5.72756 5.2384 6.0891 5 6.48913 5ZM17 14C17 14.5523 16.5523 15 16 15H4C3.44772 15 3 14.5523 3 14V12C3 11.4477 3.44772 11 4 11H16C16.5523 11 17 11.4477 17 12V14Z' />
					</svg>
					<p className='text-slate-100 text-2xl select-none'>
						Free <b>LUIS BÁRCENAS</b> simulator
					</p>
				</div>
				<div className='flex items-center'>
					<p className='text-base text-slate-300 mr-4'>
						Discos rotos: <b>{brokenDisk}</b>
					</p>
					<p className='text-base text-slate-300 mr-4'>
						Visitas a la Audiencia Nacional: <b>{audiencia}</b>
					</p>
				</div>
			</div>

			<div className='flex flex-col w-screen h-max items-center px-4'>
				{getImage(status)}
				{status !== 'broken' ? (
					<div
						onMouseDown={async () => {
							setStatus('yes');
							await sleep(100);
							setStatus('no');
							setCount(count + 1);
						}}
						className='flex justify-center w-full px-8 py-4 cursor-pointer rounded-lg bg-slate-800 text-slate-100 text-3xl font-bold hover:bg-slate-700 active:bg-slate-900 ease-in-out duration-150 select-none'
					>
						Romper
					</div>
				) : (
					<div className='flex flex-col space-y-4 w-full items-center'>
						<div
							onClick={() => null}
							className='flex justify-center w-full px-8 py-4 cursor-not-allowed rounded-lg bg-slate-600 text-slate-100 text-3xl font-bold select-none'
						>
							Lo has roto
						</div>
						<p
							onClick={() => {
								setStatus('no');
								setCount(0);
							}}
							className='font-bold text-slate-700 hover:underline'
						>
							Romper otro
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
