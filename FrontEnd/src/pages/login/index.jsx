import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const LOGIN_TEXT = {
  fi: {
    title: "Kirjaudu sisaan",
    username: "Kayttajanimi",
    password: "Salasana",
    button: "Kirjaudu",
    noAccount: "Ei viela tiliä?",
    signUp: "Rekisteroidy",
    loginSuccess: "Kirjautuminen onnistui!",
    loginError: "Kirjautuminen ei onnistunut.",
    validation: {
      usernameRequired: "Kayttajanimi on pakollinen",
      usernameMin: "Kayttajanimen tulee olla vahintaan 2 merkkia",
      usernameMax: "Kayttajanimi saa olla enintaan 20 merkkia",
      usernamePattern: "Kayttajanimi voi sisaltaa vain kirjaimia, numeroita ja alaviivoja",
      passwordRequired: "Salasana on pakollinen",
      passwordMin: "Salasanan tulee olla vahintaan 8 merkkia",
      passwordMax: "Salasana saa olla enintaan 20 merkkia",
      passwordPattern: "Salasana ei voi sisaltaa vain numeroita",
    },
  },
  en: {
    title: "Login",
    username: "Username",
    password: "Password",
    button: "Login",
    noAccount: "No account yet?",
    signUp: "Sign up",
    loginSuccess: "Login successful!",
    loginError: "Could not log in.",
    validation: {
      usernameRequired: "Username is required",
      usernameMin: "Username must be at least 2 characters",
      usernameMax: "Username must be at most 20 characters",
      usernamePattern: "Username may contain only letters, numbers and underscores",
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 8 characters",
      passwordMax: "Password must be at most 20 characters",
      passwordPattern: "Password cannot contain only numbers",
    },
  },
  ru: {
    title: "Войти",
    username: "Имя пользователя",
    password: "Пароль",
    button: "Войти",
    noAccount: "Еще нет аккаунта?",
    signUp: "Регистрация",
    loginSuccess: "Вход выполнен успешно!",
    loginError: "Не удалось войти в аккаунт.",
    validation: {
      usernameRequired: "Имя пользователя обязательно",
      usernameMin: "Имя пользователя должно быть не короче 2 символов",
      usernameMax: "Имя пользователя должно быть не длиннее 20 символов",
      usernamePattern: "Имя пользователя может содержать только буквы, цифры и нижнее подчеркивание",
      passwordRequired: "Пароль обязателен",
      passwordMin: "Пароль должен быть не короче 8 символов",
      passwordMax: "Пароль должен быть не длиннее 20 символов",
      passwordPattern: "Пароль не может состоять только из цифр",
    },
  },
  de: {
    title: "Anmelden",
    username: "Benutzername",
    password: "Passwort",
    button: "Anmelden",
    noAccount: "Noch kein Konto?",
    signUp: "Registrieren",
    loginSuccess: "Anmeldung erfolgreich!",
    loginError: "Anmeldung fehlgeschlagen.",
    validation: {
      usernameRequired: "Benutzername ist erforderlich",
      usernameMin: "Benutzername muss mindestens 2 Zeichen lang sein",
      usernameMax: "Benutzername darf hochstens 20 Zeichen haben",
      usernamePattern: "Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten",
      passwordRequired: "Passwort ist erforderlich",
      passwordMin: "Passwort muss mindestens 8 Zeichen lang sein",
      passwordMax: "Passwort darf hochstens 20 Zeichen haben",
      passwordPattern: "Passwort darf nicht nur aus Zahlen bestehen",
    },
  },
  fr: {
    title: "Connexion",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    button: "Connexion",
    noAccount: "Pas encore de compte ?",
    signUp: "Inscription",
    loginSuccess: "Connexion reussie !",
    loginError: "La connexion a echoue.",
    validation: {
      usernameRequired: "Le nom d'utilisateur est obligatoire",
      usernameMin: "Le nom d'utilisateur doit contenir au moins 2 caracteres",
      usernameMax: "Le nom d'utilisateur doit contenir au maximum 20 caracteres",
      usernamePattern: "Le nom d'utilisateur peut contenir uniquement des lettres, chiffres et soulignes",
      passwordRequired: "Le mot de passe est obligatoire",
      passwordMin: "Le mot de passe doit contenir au moins 8 caracteres",
      passwordMax: "Le mot de passe doit contenir au maximum 20 caracteres",
      passwordPattern: "Le mot de passe ne peut pas contenir uniquement des chiffres",
    },
  },
  it: {
    title: "Accesso",
    username: "Nome utente",
    password: "Password",
    button: "Accedi",
    noAccount: "Non hai ancora un account?",
    signUp: "Registrati",
    loginSuccess: "Accesso riuscito!",
    loginError: "Impossibile accedere.",
    validation: {
      usernameRequired: "Il nome utente e obbligatorio",
      usernameMin: "Il nome utente deve contenere almeno 2 caratteri",
      usernameMax: "Il nome utente puo contenere al massimo 20 caratteri",
      usernamePattern: "Il nome utente puo contenere solo lettere, numeri e underscore",
      passwordRequired: "La password e obbligatoria",
      passwordMin: "La password deve contenere almeno 8 caratteri",
      passwordMax: "La password puo contenere al massimo 20 caratteri",
      passwordPattern: "La password non puo contenere solo numeri",
    },
  },
  el: {
    title: "Συνδεση",
    username: "Ονομα χρηστη",
    password: "Κωδικος",
    button: "Συνδεση",
    noAccount: "Δεν εχετε ακομα λογαριασμο;",
    signUp: "Εγγραφη",
    loginSuccess: "Η συνδεση ολοκληρωθηκε!",
    loginError: "Η συνδεση απετυχε.",
    validation: {
      usernameRequired: "Το ονομα χρηστη ειναι υποχρεωτικο",
      usernameMin: "Το ονομα χρηστη πρεπει να εχει τουλαχιστον 2 χαρακτηρες",
      usernameMax: "Το ονομα χρηστη πρεπει να εχει το πολυ 20 χαρακτηρες",
      usernamePattern: "Το ονομα χρηστη μπορει να περιεχει μονο γραμματα, αριθμους και κατω παυλα",
      passwordRequired: "Ο κωδικος ειναι υποχρεωτικος",
      passwordMin: "Ο κωδικος πρεπει να εχει τουλαχιστον 8 χαρακτηρες",
      passwordMax: "Ο κωδικος πρεπει να εχει το πολυ 20 χαρακτηρες",
      passwordPattern: "Ο κωδικος δεν μπορει να περιεχει μονο αριθμους",
    },
  },
  es: {
    title: "Iniciar sesion",
    username: "Nombre de usuario",
    password: "Contrasena",
    button: "Entrar",
    noAccount: "Todavia no tienes cuenta?",
    signUp: "Registrarse",
    loginSuccess: "Inicio de sesion correcto!",
    loginError: "No se pudo iniciar sesion.",
    validation: {
      usernameRequired: "El nombre de usuario es obligatorio",
      usernameMin: "El nombre de usuario debe tener al menos 2 caracteres",
      usernameMax: "El nombre de usuario debe tener como maximo 20 caracteres",
      usernamePattern: "El nombre de usuario solo puede contener letras, numeros y guion bajo",
      passwordRequired: "La contrasena es obligatoria",
      passwordMin: "La contrasena debe tener al menos 8 caracteres",
      passwordMax: "La contrasena debe tener como maximo 20 caracteres",
      passwordPattern: "La contrasena no puede contener solo numeros",
    },
  },
  et: {
    title: "Logi sisse",
    username: "Kasutajanimi",
    password: "Parool",
    button: "Logi sisse",
    noAccount: "Pole veel kontot?",
    signUp: "Registreeru",
    loginSuccess: "Sisselogimine onnistus!",
    loginError: "Sisselogimine ebaonnestus.",
    validation: {
      usernameRequired: "Kasutajanimi on kohustuslik",
      usernameMin: "Kasutajanimi peab olema vahemalt 2 marki",
      usernameMax: "Kasutajanimi voib olla kuni 20 marki",
      usernamePattern: "Kasutajanimi voib sisaldada ainult tahti, numbreid ja alakriipsu",
      passwordRequired: "Parool on kohustuslik",
      passwordMin: "Parool peab olema vahemalt 8 marki",
      passwordMax: "Parool voib olla kuni 20 marki",
      passwordPattern: "Parool ei voi koosneda ainult numbritest",
    },
  },
  lv: {
    title: "Pieslegties",
    username: "Lietotajvards",
    password: "Parole",
    button: "Pieslegties",
    noAccount: "Vel nav konta?",
    signUp: "Registracija",
    loginSuccess: "Pieslegsanas veiksmiga!",
    loginError: "Neizdevas pieslegties.",
    validation: {
      usernameRequired: "Lietotajvards ir obligats",
      usernameMin: "Lietotajvardam jabut vismaz 2 simboliem",
      usernameMax: "Lietotajvardam jabut ne vairak ka 20 simboliem",
      usernamePattern: "Lietotajvards drikst saturt tikai burtus, ciparus un pasvitrojumu",
      passwordRequired: "Parole ir obligata",
      passwordMin: "Parolei jabut vismaz 8 simboliem",
      passwordMax: "Parolei jabut ne vairak ka 20 simboliem",
      passwordPattern: "Parole nevar sastavet tikai no cipariem",
    },
  },
  lt: {
    title: "Prisijungimas",
    username: "Vartotojo vardas",
    password: "Slaptazodis",
    button: "Prisijungti",
    noAccount: "Dar neturite paskyros?",
    signUp: "Registracija",
    loginSuccess: "Prisijungimas sekmingas!",
    loginError: "Nepavyko prisijungti.",
    validation: {
      usernameRequired: "Vartotojo vardas butinas",
      usernameMin: "Vartotojo vardas turi buti bent 2 simboliu",
      usernameMax: "Vartotojo vardas gali buti ne ilgesnis kaip 20 simboliu",
      usernamePattern: "Vartotojo vardas gali tureti tik raides, skaicius ir pabraukima",
      passwordRequired: "Slaptazodis butinas",
      passwordMin: "Slaptazodis turi buti bent 8 simboliu",
      passwordMax: "Slaptazodis gali buti ne ilgesnis kaip 20 simboliu",
      passwordPattern: "Slaptazodis negali buti sudarytas tik is skaiciu",
    },
  },
  pl: {
    title: "Logowanie",
    username: "Nazwa uzytkownika",
    password: "Haslo",
    button: "Zaloguj sie",
    noAccount: "Nie masz jeszcze konta?",
    signUp: "Rejestracja",
    loginSuccess: "Logowanie udane!",
    loginError: "Nie udalo sie zalogowac.",
    validation: {
      usernameRequired: "Nazwa uzytkownika jest wymagana",
      usernameMin: "Nazwa uzytkownika musi miec co najmniej 2 znaki",
      usernameMax: "Nazwa uzytkownika moze miec maksymalnie 20 znakow",
      usernamePattern: "Nazwa uzytkownika moze zawierac tylko litery, cyfry i podkreslenie",
      passwordRequired: "Haslo jest wymagane",
      passwordMin: "Haslo musi miec co najmniej 8 znakow",
      passwordMax: "Haslo moze miec maksymalnie 20 znakow",
      passwordPattern: "Haslo nie moze skladac sie tylko z cyfr",
    },
  },
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = LOGIN_TEXT[language] || LOGIN_TEXT.en;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onRegister = async (data) => {
    const result = await dispatch(fetchLogin(data));
    if (result.payload && "serverError" in result.payload) {
      alert(text.loginError);
    } else {
      alert(text.loginSuccess);
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
            })}
            placeholder={text.username}
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
            })}
          />

          <button>{text.button}</button>
        </form>
        <p>
          {text.noAccount} <a href="/sign_up">{text.signUp}</a>
        </p>
      </div>
    </div>
  );
};
