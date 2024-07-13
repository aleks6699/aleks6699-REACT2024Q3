import './loading.css';
import loading from '/loading.gif';

export default function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  );
}
