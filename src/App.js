import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//componetes da biblioteca react-router-dom que sao usadas para criar rotas.

//paginas que estao sendo importadas
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import Newproject from './components/pages/Newproject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

//container
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';


function App() {
  return (

    //criando as rotas e colocando na nav para ao clicar seremos direcionados a cada pagina de destino.
    <Router>
      {/* para  exibir o navbar na pagina */}
      <Navbar />

      <Container customClass='min-height'>  
        {/* abaixo temos as rotas, path é aonde fica o caminhos na url, element é a funçao que foi importada do arquivo com a pagina respectiva. cada um desses estara na pasta pages que é referente a cada pagina.  */}
        <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/projects' element={<Projects />} />

            <Route path='/company' element={<Company />} />

            <Route path='/contact' element={<Contact />} />

            <Route path='/newproject' element={<Newproject />} />

            <Route path='/project/:id' element={<Project />} />

        </Routes>

      </Container> 

      <Footer />

    </Router>

    
  );
}

export default App;
