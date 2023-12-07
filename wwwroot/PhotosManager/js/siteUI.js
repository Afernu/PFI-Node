let contentScrollPosition = 0;
let loginMessage = "";
let loggedUser = "";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Views rendering
function showWaitingGif() {
    eraseContent();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='images/Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function saveContentScrollPosition() {
    contentScrollPosition = $("#content")[0].scrollTop;
}
function restoreContentScrollPosition() {
    $("#content")[0].scrollTop = contentScrollPosition;
}
function updateHeader(title, subTitle) {
    $("#header").empty(); // Clear existing content in #header
    loggedUser = API.retrieveLoggedUser();

    if (loggedUser) {
        $("#header").append(`
        <span title="Inscription" id="listPhotosCmd">
            <img src="images/PhotoCloudLogo.png" class="appLogo">
        </span>
        <span class="viewTitle">${title}
            <div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>
        </span>
        <div class="headerMenusContainer">
            <span>&nbsp;</span> <!--filler-->
            <i title="Modifier votre profil">
                <div class="UserAvatarSmall" userid="${loggedUser.Id}" id="editProfilCmd"
                    style="background-image:url('${loggedUser.Avatar}')" title="Nicolas Chourot"></div>
            </i>
            <div class="dropdown ms-auto dropdownLayout">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="cmdIcon fa fa-ellipsis-vertical"></i>
                </div>
                <div class="dropdown-menu noselect">
                <span class="dropdown-item" id="manageUserCm">
                <i class="menuIcon fas fa-user-cog mx-2"></i>
                Gestion des usagers
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="logoutCmd">
                <i class="menuIcon fa fa-sign-out mx-2"></i>
                Déconnexion
                </span>
                <span class="dropdown-item" id="editProfilMenuCmd">
                <i class="menuIcon fa fa-user-edit mx-2"></i>
                Modifier votre profil
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="listPhotosMenuCmd">
                <i class="menuIcon fa fa-image mx-2"></i>
                Liste des photos
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="sortByDateCmd">
                <i class="menuIcon fa fa-check mx-2"></i>
                <i class="menuIcon fa fa-calendar mx-2"></i>
                Photos par date de création
                </span>
                <span class="dropdown-item" id="sortByOwnersCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-users mx-2"></i>
                Photos par créateur
                </span>
                <span class="dropdown-item" id="sortByLikesCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-user mx-2"></i>
                Photos les plus aiméés
                </span>
                <span class="dropdown-item" id="ownerOnlyCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-user mx-2"></i>
                Mes photos
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="aboutCmd">
                <i class="menuIcon fa fa-info-circle mx-2"></i>
                À propos...
                </span>
                </div>
            </div>
        </div>
        <span class="subTitle">${subTitle}</span>
    `);
    }
    else {
        $("#header").append(`
        <span title="Inscription" id="listPhotosCmd">
            <img src="images/PhotoCloudLogo.png" class="appLogo">
        </span>
        <span class="viewTitle">${title}
            <div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>
        </span>
        <div class="headerMenusContainer">
            <span>&nbsp;</span> <!--filler-->
            <i title="Modifier votre profil">
                <div class="UserAvatarSmall" userid="" id="editProfilCmd"
                    style="background-image:url('')" title="Nicolas Chourot"></div>
            </i>
            <div class="dropdown ms-auto dropdownLayout">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="cmdIcon fa fa-ellipsis-vertical"></i>
                </div>
                <div class="dropdown-menu noselect">
                <span class="dropdown-item" id="manageUserCm">
                <i class="menuIcon fas fa-user-cog mx-2"></i>
                Gestion des usagers
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="logoutCmd">
                <i class="menuIcon fa fa-sign-out mx-2"></i>
                Déconnexion
                </span>
                <span class="dropdown-item" id="editProfilMenuCmd">
                <i class="menuIcon fa fa-user-edit mx-2"></i>
                Modifier votre profil
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="listPhotosMenuCmd">
                <i class="menuIcon fa fa-image mx-2"></i>
                Liste des photos
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="sortByDateCmd">
                <i class="menuIcon fa fa-check mx-2"></i>
                <i class="menuIcon fa fa-calendar mx-2"></i>
                Photos par date de création
                </span>
                <span class="dropdown-item" id="sortByOwnersCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-users mx-2"></i>
                Photos par créateur
                </span>
                <span class="dropdown-item" id="sortByLikesCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-user mx-2"></i>
                Photos les plus aiméés
                </span>
                <span class="dropdown-item" id="ownerOnlyCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-user mx-2"></i>
                Mes photos
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="aboutCmd">
                <i class="menuIcon fa fa-info-circle mx-2"></i>
                À propos...
                </span>
                </div>
            </div>
        </div>
        <span class="subTitle">${subTitle}</span>
    `);
    }
    $("#editProfilCmd").on("click", function () {
        renderModify();
    });
    $("#logoutCmd").on("click", function (event) {
        event.preventDefault();

        API.logout()
            .then(success => {
                if (success) {
                    renderLoginForm();
                } else {
                    console.error('Logout failed.');
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
                // Handle error
            });
    });

}
function renderAbout() {
    timeout();
    saveContentScrollPosition();
    eraseContent();
    updateHeader("À propos...", "about");

    $("#content").append(
        $(`
            <div class="aboutContainer">
                <h2>Gestionnaire de photos</h2>
                <hr>
                <p>
                    Petite application de gestion de photos multiusagers à titre de démonstration
                    d'interface utilisateur monopage réactive.
                </p>
                <p>
                    Auteur: Nicolas Chourot
                </p>
                <p>
                    Collège Lionel-Groulx, automne 2023
                </p>
            </div>
        `))
}
function renderCreateProfil() {
    noTimeout(); // ne pas limiter le temps d’inactivité
    eraseContent(); // effacer le conteneur #content
    updateHeader("Inscription", " "); // mettre à jour l’entête et menu
    $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
    $("#content").append(`
    <form class="form" id="createProfilForm">
        <fieldset>
            <legend>Adresse ce courriel</legend>
            <input type="email"
                class="form-control Email"
                name="Email"
                id="Email"
                placeholder="Courriel"
                required
                RequireMessage="Veuillez entrer votre courriel"
                InvalidMessage="Courriel invalide"
                CustomErrorMessage="Ce courriel est déjà utilisé" />
            <input class="form-control MatchedInput"
                type="text"
                matchedInputId="Email"
                name="matchedEmail"
                id="matchedEmail"
                placeholder="Vérification"
                required
                RequireMessage="Veuillez entrez de nouveau votre courriel"
                InvalidMessage="Les courriels ne correspondent pas" />
        </fieldset>

        <fieldset>
            <legend>Mot de passe</legend>
            <input type="password"
                class="form-control"
                name="Password"
                id="Password"
                placeholder="Mot de passe"
                required
                RequireMessage="Veuillez entrer un mot de passe"
                InvalidMessage="Mot de passe trop court" />
            <input class="form-control MatchedInput"
                type="password"
                matchedInputId="Password"
                name="matchedPassword"
                id="matchedPassword"
                placeholder="Vérification"
                required
                InvalidMessage="Ne correspond pas au mot de passe" />
        </fieldset>

        <fieldset>
            <legend>Nom</legend>
            <input type="text"
                class="form-control Alpha"
                name="Name"
                id="Name"
                placeholder="Nom"
                required
                RequireMessage="Veuillez entrer votre nom"
                InvalidMessage="Nom invalide" />
        </fieldset>

        <fieldset>
            <legend>Avatar</legend>
            <div class="imageUploader"
                newImage="true"
                controlId="Avatar"
                imageSrc="images/no-avatar.png"
                waitingImage="images/Loading_icon.gif">
            </div>
        </fieldset>

        <input type="submit" name="submit" id="saveUserCmd" value="Enregistrer" class="form-control btn-primary">
    </form>

    <div class="cancel">
        <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
    </div>

    `);
    $('#loginCmd').on('click', renderLoginForm); // call back sur clic
    initFormValidation();
    initImageUploaders();
    $('#abortCmd').on('click', renderLoginForm); // call back sur clic
    // ajouter le mécanisme de vérification de doublon de courriel
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');
    // call back la soumission du formulaire
    $('#createProfilForm').on("submit", function (event) {
        let profil = getFormData($('#createProfilForm'));
        delete profil.matchedPassword;
        delete profil.matchedEmail;
        event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
        showWaitingGif(); // afficher GIF d’attente
        createProfil(profil); // commander la création au service API
    });
}
function renderLoginForm() {
    noTimeout(); // Do not limit the inactivity time
    eraseContent(); // Clear the #content container
    updateHeader("Connection", " ");

    let EmailError = "";
    let passwordError = "";
    let Email = "";

    updateLoginFormUI();

    function updateLoginFormUI() {
        $("#content").empty().append(`
        <h3>${loginMessage}</h3>
        <form class="form" id="loginForm">
            <input type='email' name='Email' class="form-control" required RequireMessage='Veuillez entrer votre courriel'
                InvalidMessage='Courriel invalide' placeholder="adresse de courriel" value='${Email}'>
            <span style='color:red'>${EmailError}</span>
            <input type='password' name='Password' placeholder='Mot de passe' class="form-control" required
                RequireMessage='Veuillez entrer votre mot de passe'>
            <span style='color:red'>${passwordError}</span>
            <input type='submit' name='submit' value="Entrer" class="form-control btn-primary">
        </form>
        <div class="form">
            <hr>
            <button class="form-control btn-info" id="createProfileCmd">Nouveau compte</button>
        </div>`);

        // Attach event handlers
        $('#createProfileCmd').on('click', renderCreateProfil); // callback on click
        initFormValidation();
        initImageUploaders();

        addConflictValidation(API.checkConflictURL(), 'Email', 'loginForm');

        $('#loginForm').on("submit", function (event) {
            event.preventDefault(); // prevent the browser from submitting the form
            const emailValue = $("input[name='Email']").val();
            const passwordValue = $("input[name='Password']").val();

            authenticateUser(emailValue, passwordValue);
        });
    }

    function authenticateUser(email, password) {
        API.login(email, password)
            .then(userSuccess => {
                if (userSuccess) {
                    const user = API.retrieveLoggedUser();
                    if (user && user.VerifyCode == "unverified") {
                        renderVerify();
                    } else {
                        console.log('Login successful:', userSuccess);
                        renderIndex();
                    }
                } else {
                    // Login failed
                    loginMessage = 'Erreur de connexion';
                    updateLoginFormUI();
                }
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }


}
function getFormData(form) {
    let formDataArray = form.serializeArray();

    let formDataObject = {};
    $.each(formDataArray, function (i, field) {
        formDataObject[field.name] = field.value;
    });

    return formDataObject;
}
function createProfil(profil) {
    const user = {
        Id: 0, // set to 0 for new registration
        Name: profil.Name,
        Email: profil.Email,
        Password: profil.Password,
        Avatar: profil.Avatar || 'images/no-avatar.png'
    };

    API.register(user)
        .then(user => {
            // Successful login
            console.log('register successful:', user);
            loginMessage = "Votre compte a été créé. Veuillez prendre vos courriels pour récupérer votre code de vérification qui vous sera demandé lors de votre prochaine connection";
            renderLoginForm();
        })
        .catch(error => {
            console.error('Error during login:', error);
            EmailError = "Courriel deja utiliser";
            passwordError = "Mot de passe incorrect";
        })
        .finally(() => {
            console.log('Finally block executed');
        });

}
function renderVerify() {
    let EmailError = " ";
    noTimeout();
    updateHeader("Verification", " ");
    eraseContent();

    $("#content").append(`
        <h3>Veuillez entrer le code de vérification que vous avez reçu par courriel</h3>
        <form class="form" id="Verifier">
            <input type='number' name='VerificationCode' class="form-control" required
                RequireMessage='Code de vérification de courriel' InvalidMessage='Code invalide'
                placeholder="Code de vérification de courriel">
            <span style='color:red'>${EmailError}</span>
            <div class="form">
                <hr>
                <button type='submit' class="form-control btn-info">Verifier</button>
            </div>
        </form>
    `);

    $('#Verifier').on("submit", function (event) {
        event.preventDefault();
        const user = API.retrieveLoggedUser();

        const verificationCode = $("input[name='VerificationCode']").val();

        if (API.verifyEmail(user.Id, verificationCode))
            renderLoginForm();
        loginMessage = "";
    });
}
function renderIndex() {
    initTimeout();
    eraseContent();
    updateHeader("Liste de photos", " ");
    //a faire partie 2
}
function renderModify() {
    initTimeout();
    eraseContent();
    updateHeader("Profil", " ")


    initFormValidation();
    initImageUploaders();
    $('#abortCmd').on('click', renderIndex); // call back sur clic
    // ajouter le mécanisme de vérification de doublon de courriel
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');


    $("#content").append(`
    <form class="form" id="editProfilForm">
        <input type="hidden" name="Id" id="Id" value="${loggedUser.Id}" />

        <fieldset>
            <legend>Adresse ce courriel</legend>
            <input type="email"
                class="form-control Email"
                name="Email"
                id="Email"
                placeholder="Courriel"
                required
                RequireMessage="Veuillez entrer votre courriel"
                InvalidMessage="Courriel invalide"
                CustomErrorMessage="Ce courriel est déjà utilisé"
                value="${loggedUser.Email}" />

            <input class="form-control MatchedInput"
                type="text"
                matchedInputId="Email"
                name="matchedEmail"
                id="matchedEmail"
                placeholder="Vérification"
                required
                RequireMessage="Veuillez entrez de nouveau votre courriel"
                InvalidMessage="Les courriels ne correspondent pas"
                value="${loggedUser.Email}" />
        </fieldset>

        <fieldset>
            <legend>Mot de passe</legend>
            <input type="password"
                class="form-control"
                name="Password"
                id="Password"
                placeholder="Mot de passe"
                InvalidMessage="Mot de passe trop court" />

            <input class="form-control MatchedInput"
                type="password"
                matchedInputId="Password"
                name="matchedPassword"
                id="matchedPassword"
                placeholder="Vérification"
                InvalidMessage="Ne correspond pas au mot de passe" />
        </fieldset>

        <fieldset>
            <legend>Nom</legend>
            <input type="text"
                class="form-control Alpha"
                name="Name"
                id="Name"
                placeholder="Nom"
                required
                RequireMessage="Veuillez entrer votre nom"
                InvalidMessage="Nom invalide"
                value="${loggedUser.Name}" />
        </fieldset>

        <fieldset>
            <legend>Avatar</legend>
            <div class="imageUploader"
                newImage="false"
                controlId="Avatar"
                imageSrc="${loggedUser.Avatar}"
                waitingImage="images/Loading_icon.gif">
            </div>
        </fieldset>

        <input type="submit"
            name="submit"
            id="saveUserCmd"
            value="Enregistrer"
            class="form-control btn-primary">
    </form>

    <div class="cancel">
        <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
    </div>

    <div class="cancel">
        <hr>
        <a">
            <button class="form-control btn-warning id="deleteCmd">Effacer le compte</button>
        </a>
    </div>
    `);

    // PUT:account/modify body payload[{"Id": 0, "Name": "...", "Email": "...", "Password": "..."}]

    $("#saveUserCmd").on("click", function (event) {
        event.preventDefault();

        const user = API.retrieveLoggedUser();

        API.modifyUserProfil(user)
            .then(success => {
                if (success) {
                    renderIndex();
                } else {
                    // Handle modification failure
                }
            })
            .catch(error => {
                console.error('Error modifying user profile:', error);
            });
    });
    $("deleteCmd").on("Click", function (event){
        event.preventDefault();
        const user = API.retrieveLoggedUser();
        
        API.unsubscribeAccount(user.Id)
        .then(success =>{
            if(success)
                renderLoginForm();
        })
        .catch(error => {
            console.error("??",error);
        })
    });
}

