import Hero from './components/Hero.jsx';
import Letter from './components/Letter.jsx';

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <Letter/>
    </main>
  );
};

export default App;
