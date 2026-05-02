import styles from "./signUp.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const SIGNUP_TEXT = {
  fi: {
    title: "Rekisterointi",
    username: "Kayttajanimi",
    email: "Sahkoposti",
    password: "Salasana",
    confirmPassword: "Vahvista salasana",
    button: "Rekisteroidy",
    haveAccount: "Onko sinulla jo tili?",
    login: "Kirjaudu",
    registerSuccess: "Rekisterointi onnistui!",
    registerError: "Rekisterointi ei onnistunut.",
    validation: {
      usernameRequired: "Kayttajanimi on pakollinen",
      usernameMin: "Kayttajanimen tulee olla vahintaan 2 merkkia",
      usernameMax: "Kayttajanimi saa olla enintaan 20 merkkia",
      usernamePattern: "Kayttajanimi voi sisaltaa vain kirjaimia, numeroita ja alaviivoja",
      emailRequired: "Sahkoposti on pakollinen",
      emailInvalid: "Virheellinen sahkopostiosoite",
      passwordRequired: "Salasana on pakollinen",
      passwordMin: "Salasanan tulee olla vahintaan 8 merkkia",
      passwordMax: "Salasana saa olla enintaan 20 merkkia",
      passwordPattern: "Salasana ei voi sisaltaa vain numeroita",
      confirmRequired: "Salasanan vahvistus on pakollinen",
    },
  },
  en: {
    title: "Register",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    button: "Sign up",
    haveAccount: "Already have an account?",
    login: "Login",
    registerSuccess: "Registration successful!",
    registerError: "Could not register.",
    validation: {
      usernameRequired: "Username is required",
      usernameMin: "Username must be at least 2 characters",
      usernameMax: "Username must be at most 20 characters",
      usernamePattern: "Username may contain only letters, numbers and underscores",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email address",
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 8 characters",
      passwordMax: "Password must be at most 20 characters",
      passwordPattern: "Password cannot contain only numbers",
      confirmRequired: "Password confirmation is required",
    },
  },
  ru: {
    title: "Регистрация",
    username: "Имя пользователя",
    email: "Почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    button: "Зарегистрироваться",
    haveAccount: "Уже есть аккаунт?",
    login: "Войти",
    registerSuccess: "Регистрация прошла успешно!",
    registerError: "Не удалось зарегистрироваться.",
    validation: {
      usernameRequired: "Имя пользователя обязательно",
      usernameMin: "Имя пользователя должно быть не короче 2 символов",
      usernameMax: "Имя пользователя должно быть не длиннее 20 символов",
      usernamePattern: "Имя пользователя может содержать только буквы, цифры и нижнее подчеркивание",
      emailRequired: "Почта обязательна",
      emailInvalid: "Неверный адрес почты",
      passwordRequired: "Пароль обязателен",
      passwordMin: "Пароль должен быть не короче 8 символов",
      passwordMax: "Пароль должен быть не длиннее 20 символов",
      passwordPattern: "Пароль не может состоять только из цифр",
      confirmRequired: "Подтверждение пароля обязательно",
    },
  },
  de: {
    title: "Registrierung",
    username: "Benutzername",
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort bestatigen",
    button: "Registrieren",
    haveAccount: "Haben Sie bereits ein Konto?",
    login: "Anmelden",
    registerSuccess: "Registrierung erfolgreich!",
    registerError: "Registrierung fehlgeschlagen.",
    validation: {
      usernameRequired: "Benutzername ist erforderlich",
      usernameMin: "Benutzername muss mindestens 2 Zeichen lang sein",
      usernameMax: "Benutzername darf hochstens 20 Zeichen haben",
      usernamePattern: "Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten",
      emailRequired: "E-Mail ist erforderlich",
      emailInvalid: "Ungultige E-Mail-Adresse",
      passwordRequired: "Passwort ist erforderlich",
      passwordMin: "Passwort muss mindestens 8 Zeichen lang sein",
      passwordMax: "Passwort darf hochstens 20 Zeichen haben",
      passwordPattern: "Passwort darf nicht nur aus Zahlen bestehen",
      confirmRequired: "Passwortbestatigung ist erforderlich",
    },
  },
  fr: {
    title: "Inscription",
    username: "Nom d'utilisateur",
    email: "E-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    button: "S'inscrire",
    haveAccount: "Vous avez deja un compte ?",
    login: "Connexion",
    registerSuccess: "Inscription reussie !",
    registerError: "L'inscription a echoue.",
    validation: {
      usernameRequired: "Le nom d'utilisateur est obligatoire",
      usernameMin: "Le nom d'utilisateur doit contenir au moins 2 caracteres",
      usernameMax: "Le nom d'utilisateur doit contenir au maximum 20 caracteres",
      usernamePattern: "Le nom d'utilisateur peut contenir uniquement des lettres, chiffres et soulignes",
      emailRequired: "L'e-mail est obligatoire",
      emailInvalid: "Adresse e-mail invalide",
      passwordRequired: "Le mot de passe est obligatoire",
      passwordMin: "Le mot de passe doit contenir au moins 8 caracteres",
      passwordMax: "Le mot de passe doit contenir au maximum 20 caracteres",
      passwordPattern: "Le mot de passe ne peut pas contenir uniquement des chiffres",
      confirmRequired: "La confirmation du mot de passe est obligatoire",
    },
  },
  it: {
    title: "Registrazione",
    username: "Nome utente",
    email: "E-mail",
    password: "Password",
    confirmPassword: "Conferma password",
    button: "Registrati",
    haveAccount: "Hai gia un account?",
    login: "Accedi",
    registerSuccess: "Registrazione riuscita!",
    registerError: "Impossibile registrarsi.",
    validation: {
      usernameRequired: "Il nome utente e obbligatorio",
      usernameMin: "Il nome utente deve contenere almeno 2 caratteri",
      usernameMax: "Il nome utente puo contenere al massimo 20 caratteri",
      usernamePattern: "Il nome utente puo contenere solo lettere, numeri e underscore",
      emailRequired: "L'e-mail e obbligatoria",
      emailInvalid: "Indirizzo e-mail non valido",
      passwordRequired: "La password e obbligatoria",
      passwordMin: "La password deve contenere almeno 8 caratteri",
      passwordMax: "La password puo contenere al massimo 20 caratteri",
      passwordPattern: "La password non puo contenere solo numeri",
      confirmRequired: "La conferma della password e obbligatoria",
    },
  },
  el: {
    title: "Εγγραφη",
    username: "Ονομα χρηστη",
    email: "Email",
    password: "Κωδικος",
    confirmPassword: "Επιβεβαιωση κωδικου",
    button: "Εγγραφη",
    haveAccount: "Εχετε ηδη λογαριασμο;",
    login: "Συνδεση",
    registerSuccess: "Η εγγραφη ολοκληρωθηκε!",
    registerError: "Η εγγραφη απετυχε.",
    validation: {
      usernameRequired: "Το ονομα χρηστη ειναι υποχρεωτικο",
      usernameMin: "Το ονομα χρηστη πρεπει να εχει τουλαχιστον 2 χαρακτηρες",
      usernameMax: "Το ονομα χρηστη πρεπει να εχει το πολυ 20 χαρακτηρες",
      usernamePattern: "Το ονομα χρηστη μπορει να περιεχει μονο γραμματα, αριθμους και κατω παυλα",
      emailRequired: "Το email ειναι υποχρεωτικο",
      emailInvalid: "Μη εγκυρη διευθυνση email",
      passwordRequired: "Ο κωδικος ειναι υποχρεωτικος",
      passwordMin: "Ο κωδικος πρεπει να εχει τουλαχιστον 8 χαρακτηρες",
      passwordMax: "Ο κωδικος πρεπει να εχει το πολυ 20 χαρακτηρες",
      passwordPattern: "Ο κωδικος δεν μπορει να περιεχει μονο αριθμους",
      confirmRequired: "Η επιβεβαιωση κωδικου ειναι υποχρεωτικη",
    },
  },
  es: {
    title: "Registro",
    username: "Nombre de usuario",
    email: "Correo electronico",
    password: "Contrasena",
    confirmPassword: "Confirmar contrasena",
    button: "Registrarse",
    haveAccount: "Ya tienes cuenta?",
    login: "Iniciar sesion",
    registerSuccess: "Registro correcto!",
    registerError: "No se pudo registrar la cuenta.",
    validation: {
      usernameRequired: "El nombre de usuario es obligatorio",
      usernameMin: "El nombre de usuario debe tener al menos 2 caracteres",
      usernameMax: "El nombre de usuario debe tener como maximo 20 caracteres",
      usernamePattern: "El nombre de usuario solo puede contener letras, numeros y guion bajo",
      emailRequired: "El correo electronico es obligatorio",
      emailInvalid: "Direccion de correo no valida",
      passwordRequired: "La contrasena es obligatoria",
      passwordMin: "La contrasena debe tener al menos 8 caracteres",
      passwordMax: "La contrasena debe tener como maximo 20 caracteres",
      passwordPattern: "La contrasena no puede contener solo numeros",
      confirmRequired: "La confirmacion de la contrasena es obligatoria",
    },
  },
  et: {
    title: "Registreerimine",
    username: "Kasutajanimi",
    email: "E-post",
    password: "Parool",
    confirmPassword: "Kinnita parool",
    button: "Registreeru",
    haveAccount: "Kas sul on juba konto?",
    login: "Logi sisse",
    registerSuccess: "Registreerimine onnistus!",
    registerError: "Registreerimine ebaonnestus.",
    validation: {
      usernameRequired: "Kasutajanimi on kohustuslik",
      usernameMin: "Kasutajanimi peab olema vahemalt 2 marki",
      usernameMax: "Kasutajanimi voib olla kuni 20 marki",
      usernamePattern: "Kasutajanimi voib sisaldada ainult tahti, numbreid ja alakriipsu",
      emailRequired: "E-post on kohustuslik",
      emailInvalid: "Vigane e-posti aadress",
      passwordRequired: "Parool on kohustuslik",
      passwordMin: "Parool peab olema vahemalt 8 marki",
      passwordMax: "Parool voib olla kuni 20 marki",
      passwordPattern: "Parool ei voi koosneda ainult numbritest",
      confirmRequired: "Parooli kinnitus on kohustuslik",
    },
  },
  lv: {
    title: "Registracija",
    username: "Lietotajvards",
    email: "E-pasts",
    password: "Parole",
    confirmPassword: "Apstipriniet paroli",
    button: "Registrēties",
    haveAccount: "Vai jums jau ir konts?",
    login: "Pieslegties",
    registerSuccess: "Registracija veiksmiga!",
    registerError: "Neizdevas registracija.",
    validation: {
      usernameRequired: "Lietotajvards ir obligats",
      usernameMin: "Lietotajvardam jabut vismaz 2 simboliem",
      usernameMax: "Lietotajvardam jabut ne vairak ka 20 simboliem",
      usernamePattern: "Lietotajvards drikst saturt tikai burtus, ciparus un pasvitrojumu",
      emailRequired: "E-pasts ir obligats",
      emailInvalid: "Nederiga e-pasta adrese",
      passwordRequired: "Parole ir obligata",
      passwordMin: "Parolei jabut vismaz 8 simboliem",
      passwordMax: "Parolei jabut ne vairak ka 20 simboliem",
      passwordPattern: "Parole nevar sastavet tikai no cipariem",
      confirmRequired: "Paroles apstiprinajums ir obligats",
    },
  },
  lt: {
    title: "Registracija",
    username: "Vartotojo vardas",
    email: "El. pastas",
    password: "Slaptazodis",
    confirmPassword: "Patvirtinkite slaptazodi",
    button: "Registruotis",
    haveAccount: "Ar jau turite paskyra?",
    login: "Prisijungti",
    registerSuccess: "Registracija sekminga!",
    registerError: "Nepavyko uzregistruoti paskyros.",
    validation: {
      usernameRequired: "Vartotojo vardas butinas",
      usernameMin: "Vartotojo vardas turi buti bent 2 simboliu",
      usernameMax: "Vartotojo vardas gali buti ne ilgesnis kaip 20 simboliu",
      usernamePattern: "Vartotojo vardas gali tureti tik raides, skaicius ir pabraukima",
      emailRequired: "El. pastas butinas",
      emailInvalid: "Neteisingas el. pasto adresas",
      passwordRequired: "Slaptazodis butinas",
      passwordMin: "Slaptazodis turi buti bent 8 simboliu",
      passwordMax: "Slaptazodis gali buti ne ilgesnis kaip 20 simboliu",
      passwordPattern: "Slaptazodis negali buti sudarytas tik is skaiciu",
      confirmRequired: "Slaptazodzio patvirtinimas butinas",
    },
  },
  pl: {
    title: "Rejestracja",
    username: "Nazwa uzytkownika",
    email: "E-mail",
    password: "Haslo",
    confirmPassword: "Potwierdz haslo",
    button: "Zarejestruj sie",
    haveAccount: "Masz juz konto?",
    login: "Zaloguj sie",
    registerSuccess: "Rejestracja udana!",
    registerError: "Nie udalo sie zarejestrowac konta.",
    validation: {
      usernameRequired: "Nazwa uzytkownika jest wymagana",
      usernameMin: "Nazwa uzytkownika musi miec co najmniej 2 znaki",
      usernameMax: "Nazwa uzytkownika moze miec maksymalnie 20 znakow",
      usernamePattern: "Nazwa uzytkownika moze zawierac tylko litery, cyfry i podkreslenie",
      emailRequired: "Adres e-mail jest wymagany",
      emailInvalid: "Nieprawidlowy adres e-mail",
      passwordRequired: "Haslo jest wymagane",
      passwordMin: "Haslo musi miec co najmniej 8 znakow",
      passwordMax: "Haslo moze miec maksymalnie 20 znakow",
      passwordPattern: "Haslo nie moze skladac sie tylko z cyfr",
      confirmRequired: "Potwierdzenie hasla jest wymagane",
    },
  },
};

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = SIGNUP_TEXT[language] || SIGNUP_TEXT.en;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onRegister = async (data) => {
    const result = await dispatch(fetchRegister(data));
    if (result.payload && "serverError" in result.payload) {
      alert(text.registerError);
    } else {
      alert(text.registerSuccess);
      navigate("/");
    }
  };

  return (
    <div className={styles.users}>
      <div className={styles.users_box}>
        <h2>{text.title}</h2>
        <form onSubmit={handleSubmit(onRegister)} className={styles.form}>
          <p>{errors?.username?.message}</p>
          <input
            className={errors?.username ? styles.error : ""}
            {...register("username", {
              required: {
                value: true,
                message: text.validation.usernameRequired,
              },
              minLength: {
                value: 2,
                message: text.validation.usernameMin,
              },
              pattern: {
                value: /^[A-Za-z0-9_.@-]+$/,
                message: text.validation.usernamePattern,
              },
            })}
            placeholder={text.username}
          />
          <p>{errors?.email?.message}</p>
          <input
            className={errors?.email ? styles.error : ""}
            placeholder={text.email}
            {...register("email", {
              required: {
                value: true,
                message: text.validation.emailRequired,
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: text.validation.emailInvalid,
              },
            })}
          />
          <p>{errors?.password?.message}</p>
          <input
            className={errors?.password ? styles.error : ""}
            placeholder={text.password}
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: text.validation.passwordRequired,
              },
              minLength: {
                value: 6,
                message: text.validation.passwordMin,
              },
            })}
          />
          <p>{errors?.password_confirm?.message}</p>
          <input
            className={errors?.password_confirm ? styles.error : ""}
            placeholder={text.confirmPassword}
            type="password"
            {...register("password_confirm", {
              required: {
                value: true,
                message: text.validation.confirmRequired,
              },
              minLength: {
                value: 6,
                message: text.validation.passwordMin,
              },
            })}
          />
          <button>{text.button}</button>
        </form>
        <p>
          {text.haveAccount} <a href="/login">{text.login}</a>
        </p>
      </div>
    </div>
  );
};
