import React from 'react';

const Banniere = (props) => {

    return (

        <section className="overlay overlay-dark overlay-40">
            <div className="container  d-flex flex-column">
                <div className="row align-items-center justify-content-center  py-2 ">
                    <div className="col-12 col-md-8 py-4 col-lg-7 text-center">
                        <p className="lead text-white font-link my-4 fs-2">
                            Apaisant, relaxant, regénérant, le massage est un véritable outil de bien être destiné
                            autant aux adultes qu'aux enfants, il permet à votre corps de retrouver des sensations et à
                            votre mental de s'évader.
                            <br/>
                            <br/>
                            Fermez les yeux et relâchez-vous
                        </p>
                    </div>
                </div>
            </div>
            <div id="shape" className=" position-relative">
                <div className="shape shape-bottom shape-fluid-x text-dark">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="white"></path>
                    </svg>
                </div>
            </div>
        </section>


    );
}

export default Banniere;