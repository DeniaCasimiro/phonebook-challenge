import { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";

/*denia casimiro code*/

const FALLBACK_CONTACTS = [
  { id: 1, name: "Bella Beast", phone: "(555) 010-0101", email: "bella@puppybook.com", photo: "puppy-1.jpg" },
  { id: 2, name: "Buddy Bro", phone: "(555) 010-0102", email: "budbro@puppybook.com", photo: "puppy-2.jpg" },
  { id: 3, name: "Charlie Luck", phone: "(555) 010-0103", email: "charlie@puppybook.com", photo: "puppy-3.jpg" },
  { id: 4, name: "Luna Keys", phone: "555-456-7890", email: "luna@puppybook.com", photo: "puppy-4.jpg" },
  { id: 5, name: "Max Goof", phone: "555-567-8901", email: "max@puppybook.com", photo: "puppy-5.jpg" },
  { id: 6, name: "Diana Thomas", phone: "555-678-9012", email: "diana@puppybook.com", photo: "puppy-6.jpg" },
  { id: 7, name: "Cooper Lee", phone: "555-789-0123", email: "cooper@phonebook.com", photo: "puppy-7.jpg" },
  { id: 8, name: "Rocky Jones", phone: "555-901-2345", email: "rocky@puppybook.com", photo: "puppy-8.jpg" },
  { id: 9, name: "Molly Sadie", phone: "555-017-3456", email: "molly@puppybook.com", photo: "puppy-9.jpg" },
  { id: 10, name: "Shaggy Doo", phone: "555-233-1777", email: "shaggy@puppybook.com", photo: "puppy-10.jpg" },
];

/* contact home layout*/
const ContactList = ({ contacts, setContacts }) => {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const navigate = useNavigate();

  const filteredContacts = useMemo(() => {
    const lower = query.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.phone.includes(lower)
    );
  }, [contacts, query]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Please fill in both Name and Phone fields.");
      return;
    }
    const isDup = contacts.some(
      (c) =>
        c.name.toLowerCase() === form.name.toLowerCase() ||
        c.phone === form.phone
    );
    if (isDup) {
      alert("This contact already exists.");
      return;
    }
    const newContact = {
      id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      photo: "default-avatar.jpg",
    };
    setContacts([...contacts, newContact]);
    setForm({ name: "", phone: "", email: "" });
    alert(`Added ${newContact.name}!`);
  }

/* top text*/
  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">Phonebook Challenge</h1>
        <p className="page__subtitle">Puppy Contact List</p>
      </header>

      <section className="search">
        <h2>Search Contacts</h2>
        <input
          type="search"
          placeholder="Search by Name or Phone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p>Showing {filteredContacts.length} contact{filteredContacts.length !== 1 && "s"}</p>
      </section>

      <section className="contacts">
        <h2>Contacts</h2>
        <ul className="contacts__list">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <li
                key={contact.id}
                className="contact-card clickable"
                onClick={() => navigate(`/contact/${contact.id}`)}
              >
                <img
                  src={`/images/${contact.photo}`}
                  alt={contact.name}
                  className="contact-photo"
                />
                <div className="contact-info">
                  <strong>{contact.name}</strong>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No Contact Found</p>
          )}
        </ul>
      </section>

      <section className="form">
        <h2>Add a Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <button className="btn" type="submit">Add Contact</button>
        </form>
      </section>

      <footer className="page__footer">
        <small>© Phonebook Challenge — Grid View</small>
      </footer>
    </main>
  );
};

/* next contact detail layout*/
const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find((c) => c.id === parseInt(id));

  if (!contact) {
    return (
      <main className="page">
        <p>Contact not found.</p>
        <button className="btn" onClick={() => navigate("/")}>⬅ Back</button>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">{contact.name}</h1>
        <p className="page__subtitle">Contact Details</p>
      </header>

      <section className="contact-detail">
        <div className="detail-container">
          <img
            src={`/images/${contact.photo}`}
            alt={contact.name}
            className="detail-photo"
          />
          <div className="detail-info">
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Email:</strong> {contact.email}</p>
          </div>
        </div>

        <button className="btn" onClick={() => navigate("/")}>
           Back to Contacts
        </button>
      </section>

      <footer className="page__footer">
        <small>Phonebook Challenge — Contact Page</small>
      </footer>
    </main>
  );
};


/* added root app component*/
const App = () => {
  const [contacts, setContacts] = useState(FALLBACK_CONTACTS);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList contacts={contacts} setContacts={setContacts} />} />
        <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
      </Routes>
    </Router>
  );
};

export default App;
