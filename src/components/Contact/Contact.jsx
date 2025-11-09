import "./Contact.css";
import PropTypes from 'prop-types';

function getPhotoUrl(photo) {
  try {
    return photo
      ? `/images/${photo}`
      : '/images/default-puppy.jpg';
  } catch (err) {
    console.error('Error loading photo:', err);
    return '/images/default-puppy.jpg';
  }
}

const Contact = ({ name, phone, email, photo, onClick }) => {
  return (
    <div className="contact-card" onClick={onClick}>
      <div className="contact-photo-container">
        <img
          src={getPhotoUrl(photo)}
          alt={name}
          className="contact-photo"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/default-puppy.jpg';
          }}
        />
      </div>
      <div className="contact-info">
        <h3 className="contact-name">{name}</h3>
        <p className="contact-detail">{phone}</p>
        {email && <p className="contact-detail">{email}</p>}
      </div>
    </div>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string,
  photo: PropTypes.string,
  onClick: PropTypes.func
};

Contact.defaultProps = {
  photo: 'default-puppy.jpg',
  email: '',
  onClick: () => {}
};

export default Contact;
