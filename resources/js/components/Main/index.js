import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Header/index';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
//SEARCHENGINE
import Resultats from '../SearchEngine/Resultats';
//ANNONCES
import Annonces from '../Annonces/Annonces';
import Annonce from '../Annonces/Annonce';
// MISSIOON
import Presentation from '../Mission/Presentation';
import Objectifs from '../Mission/Objectifs';
import Fondation from '../Mission/Fondation';
import Partenaires from '../Mission/Partenaires';
//EQUIPE
import Direction from '../Equipe/Direction';
import Profs from '../Equipe/Profs';
import Internationale from '../Equipe/Internationale';
//PROGRAMME
import Cheminement from '../Programme/Cheminement';
import Admissibilite from '../Programme/Admissibilite';
import Perspectives from '../Programme/Perspectives';
import Couts from '../Programme/Couts';
import Mobilite from '../Programme/Mobilite';
import Ressoureces from '../Programme/Ressources';
//RECHERCHE
import LaRecherche from '../Recherche/LaRecherche';
import Urbalab from '../Recherche/Urbalab';
import Theses from '../Recherche/Theses';
//RESSOURCES 
import Lexique from '../Ressources/Lexique';
import LiensUtiles from '../Ressources/LiensUtiles';
//ACTIVITES
import Konbits from '../Activites/Konbit/Konbits';
import Konbit from '../Activites/Konbit/Konbit';
import Conferences from '../Activites/Conferences/Conferences';
import Conference from '../Activites/Conferences/Conference';
//ESPACE ETUDIANT
import InfoPratiques from '../EspaceEtudiant/InfoPratiques';
import PrixEtBourses from '../EspaceEtudiant/PrixEtBourses';
import Stage from '../EspaceEtudiant/Stage';
import Collation from '../EspaceEtudiant/Collation';
import Plateforme from '../EspaceEtudiant/Plateforme';

import Contact from '../Contact';
import Articles from '../Articles';
//PUBLICATION
import Publications from '../Publications/Publications';
import Publication from '../Publications/Publication';
//ONLY FOR ADMIN
import Admin from '../Admin/Home';
import LoginForm from '../Login/LoginForm';
import AdminAnnonces from '../Admin/Annonces';
import AdminKonbits from '../Admin/Konbits';
import AdminRegister from '../Admin/Register';
import AdminConferences from '../Admin/Conferences';
import AdminLexique from '../Admin/Lexique';
import AdminPublications from '../Admin/Publications';

import {PrivateRoute} from '../PrivateRoute'
import Accueil from '../Accueil';

import Footer from '../Footer';
import CssBaseline from '@material-ui/core/CssBaseline';// met yon ti kouleu nan background lan
export default class Main extends Component {
  
render(){
    
  return (
    <React.Fragment >    
           <Router >
           <CssBaseline />
      <Container maxWidth="lg" style={{ backgroundColor:"#f9f9f9"}}>
   
        <Header  />
        <main> 
                    <div className="container">
                     <Switch>
                         <Route path="/" exact component={ Accueil } />
                         {/* RESULLTATS SEARCHENGINE */}
                         <Route path="/resultats" exact component={Resultats} />
                         {/* ANNONCES */}
                         <Route path="/annonces" exact component={Annonces} />
                         <Route path="/annonce/:id" exact component={Annonce} />
                         {/* MISSION */}
                         <Route path="/mission/presentation" exact component={Presentation} />
                         <Route path="/mission/objectifs" exact component={Objectifs} />
                         <Route path="/mission/fondation" exact component={Fondation} />
                         <Route path="/mission/partenaires" exact component={Partenaires} />
                          {/* EQUIPE */}
                          <Route path="/equipe/direction" exact component={Direction} />
                          <Route path="/equipe/profs" exact component={Profs} />
                          <Route path="/equipe/internationale" exact component={Internationale}/>
                          {/* PROGRAMME */}
                          <Route path="/programme/cheminement" exact component={Cheminement}/>
                          <Route path="/programme/admissibilite" exact component={Admissibilite}/>
                          <Route path="/programme/perspectives" exact component={Perspectives}/>
                          <Route path="/programme/couts" exact component={Couts} />
                          <Route path="/programme/mobilite" exact component={Mobilite} />
                          <Route path="/programme/ressources" exact component={Ressoureces}/>
                          {/* RECHERCHE */}
                          <Route path="/recherche/laRecherche" exact component={LaRecherche} />
                          <Route path="/recherche/urbalab" exact component={Urbalab} />
                          <Route path="/recherche/theses" exact component={Theses} />
                          {/* RESSOURCES */}
                          <Route path="/ressources/lexique" exact component={Lexique} />
                          <Route path="/ressources/liensUtiles" exact component={LiensUtiles} />
                          {/* ACTIVITES */}
                          <Route path="/activites/konbits" exact component={Konbits} />
                          <Route path="/konbit/:id" exact component={Konbit} />
                          <Route path="/activites/conferences" exact component={Conferences}/>
                          <Route path="/conference/:id" exact component={Conference} />
                           {/* ESPACE ETUDIANT */}
                           <Route path="/espaceEtudiant/info" exact component={InfoPratiques} />
                          <Route path="/espaceEtudiant/prix" exact component={PrixEtBourses}/>
                          <Route path="/espaceEtudiant/stage" exact component={Stage}/>
                          <Route path="/espaceEtudiant/collation" exact component={Collation}/>
                          <Route path="/espaceEtudiant/plateforme" exact component={Plateforme}/>
                           {/* PUBLICATIONS */}
                           <Route path="/publications" exact component={Publications} />
                           <Route path="/publication/:id" exact component={Publication} />
                         {/* POUM METE PRIVATE ROUTE APRES */}
                         <PrivateRoute path="/admin" exact component={Admin} />
                         <PrivateRoute path="/admin/annonces" exact component={AdminAnnonces}/>
                         <PrivateRoute path="/admin/konbits" exact component={AdminKonbits}/>
                         <PrivateRoute path="/admin/register" exact component={AdminRegister}/>
                         <PrivateRoute path="/admin/conferences" exact component={AdminConferences}/>
                         <PrivateRoute path="/admin/lexique" exact component={AdminLexique}/>
                         <PrivateRoute path="/admin/publications" exact component={AdminPublications}/>

                        <Route path="/login" exact component={ LoginForm } />
                       
                        <Route path="/contact" exact component={ Contact } />
                        <Route path="/articles" exact component={ Articles } />

                        
                    </Switch>
                    </div>
                
        </main>
        
      </Container>
      <Footer  />
      </Router>
    </React.Fragment>
  );
}
}