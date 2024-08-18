export default function showPasswordStrangth(password: string) {
  if (password === '0') {
    return (
      <>
        <div className="password-strength-bar hidden">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <p className="password-strength-text">The password strength </p>
      </>
    );
  } else if ('0' < password && password <= '2') {
    return (
      <>
        <div className="password-strength-bar">
          <p className="password-red"></p>
          <p></p>
          <p></p>
        </div>
        <p className="password-strength-text">The password is weak</p>
      </>
    );
  } else if ('2' < password && password <= '4') {
    return (
      <>
        <div className="password-strength-bar">
          <p className="password-yellow"></p>
          <p className="password-yellow"></p>
          <p></p>
        </div>
        <p className="password-strength-text">The password is medium</p>
      </>
    );
  } else if ('4' < password) {
    return (
      <>
        <div className="password-strength-bar">
          <p className="password-green"></p>
          <p className="password-green"></p>
          <p className="password-green"></p>
        </div>
        <p className="password-strength-text">The password is strong</p>
      </>
    );
  }
}
