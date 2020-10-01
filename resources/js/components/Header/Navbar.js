import React, {Component} from 'react';
import {BrowserRouter as Router , Link, Route} from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from '@material-ui/icons/Home';
// import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
// import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
// import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
// import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
// import LinkIcon from '@material-ui/icons/Link';
import { connect } from 'react-redux';
import data from './Navbar.json';

 class  Navbar extends Component {
    render (){
      const TEXT = this.props.langue == '1' ?data.francais : data.creole;
  
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light "  >
  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
       
          <ul className="navbar-nav w-100 nav-justified" style={{marginRight:25}}>
         
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{marginTop:"4px"}}>
                   <Link to="/" style={{color:"gray" }}><HomeIcon /></Link>
                   </li>
          
              <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {TEXT.mission.Mission}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                 <Link to="/mission/presentation" className="nav-link dropdown-item" >{TEXT.mission.Presentation}</Link> 
         
                
                  <div className="dropdown-divider"></div>
                  <Link to="/mission/objectifs" className="nav-link dropdown-item">{TEXT.mission.Objectifs}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/mission/fondation" className="nav-link dropdown-item" href="/">{TEXT.mission.Fondation}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/mission/partenaires" className="nav-link dropdown-item" href="/">{TEXT.mission.Partenaires}</Link> 
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {TEXT.equipe.Equipe}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link to="/equipe/direction" className="nav-link dropdown-item ">{TEXT.equipe.Direction}</Link>
                <div className="dropdown-divider"></div>
                  <Link to="/equipe/profs" className="nav-link dropdown-item ">{TEXT.equipe.Prof}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/equipe/internationale" className="nav-link dropdown-item" href="/">{TEXT.equipe.Internationale}</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {TEXT.programme.Programme}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link to="/programme/cheminement" className="nav-link dropdown-item">{TEXT.programme.Cheminement}</Link>
                <div className="dropdown-divider"></div>
                  <Link to="/programme/admissibilite" className="nav-link dropdown-item ">{TEXT.programme.Conditions}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/programme/ressources" className="nav-link dropdown-item" href="/">{TEXT.programme.Ressources}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/programme/perspectives" className="nav-link dropdown-item" href="/">{TEXT.programme.Perspectives}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/programme/couts" className="nav-link dropdown-item" href="/">{TEXT.programme.Couts}</Link>
                  {/* <div className="dropdown-divider"></div>
                  <Link to="/programme/mobilite" className="nav-link dropdown-item" href="/">{TEXT.programme.Mobilite}</Link> */}
                </div>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {TEXT.recherche.Recherche}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show"> */}
                {/* <Link to="/recherche/laRecherche" className="nav-link dropdown-item ">{TEXT.recherche.LaRecherche}</Link>
                <div className="dropdown-divider"></div> */}
                  {/* <Link to="/recherche/urbalab" className="nav-link dropdown-item ">{TEXT.recherche.UrbaLab}</Link>
                  <div className="dropdown-divider"></div> */}
                  {/* <Link to="/recherche/theses" className="nav-link dropdown-item" href="/">{TEXT.recherche.These}</Link> */}
                   {/* </div>
              </li> */}
              <li className="nav-item">
                  <Link to="/publications" className="nav-link dropdown-item">
                  {TEXT.publications.Publications}</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               {TEXT.ressources.Ressources}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link to="/ressources/lexique" className="nav-link dropdown-item ">{TEXT.ressources.Lexique}</Link>
                <div className="dropdown-divider"></div>
                  <Link to="/ressources/liensUtiles" className="nav-link dropdown-item ">{TEXT.ressources.Liens}</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {TEXT.activites.Activites}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link to="/activites/konbits" className="nav-link dropdown-item ">{TEXT.activites.Konbit}</Link>
                <div className="dropdown-divider"></div>
                  <Link to="/activites/conferences" className="nav-link dropdown-item" href="/">{TEXT.activites.Conferences}</Link>
                 <div className="dropdown-divider"></div>
                  <Link to="/activites/DocArchiMos" className="nav-link dropdown-item" href="/">{TEXT.activites.DocArchiMo}</Link>
                 </div>
              </li>
                 <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {TEXT.espace.Espace}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
                {/* <Link to="/espaceEtudiant/info" className="nav-link dropdown-item ">{TEXT.espace.Info}</Link>
                <div className="dropdown-divider"></div> */}
                  <Link to="/espaceEtudiant/stage" className="nav-link dropdown-item ">{TEXT.espace.Stage}</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/espaceEtudiant/prix" className="nav-link dropdown-item ">{TEXT.espace.Prix}</Link>
                  <div className="dropdown-divider"></div>
                  {/* <Link to="/espaceEtudiant/collation" className="nav-link dropdown-item" href="/">{TEXT.espace.Collation}</Link>
                  <div className="dropdown-divider"></div> */}
                  {/* <Link to="/espaceEtudiant/plateforme" className="nav-link dropdown-item" href="/">{TEXT.espace.Acces}</Link> */}
                 </div>
              </li>
              
              <li className="nav-item">
              <div data-toggle="collapse" data-target=".navbar-collapse.show">
                  <Link to="/contact" className="nav-link ">
                 {TEXT.contact.Contact}</Link>
                  </div>
              </li>
                 
              {/* <li className="nav-item">
              <div data-toggle="collapse" data-target=".navbar-collapse.show">
               <Link to="/login" className="nav-link  ">Login</Link>
               </div>
              </li> */}

          </ul>
         
      
        </div>
      </nav>
        );
    
}
}

const mapStateToProps =(state) => ({
  langue : state.langue.item,

});
export default connect(mapStateToProps)(Navbar);
