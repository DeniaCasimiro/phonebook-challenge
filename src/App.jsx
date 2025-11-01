import { useEffect, useMemo, useState } from "react";
import "./App.css";

// Denia Casimiro code
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

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [query, setQuery] = useState("");
    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Search logic using useMemo (for performance)
    const filteredContacts = useMemo(() => {
        const lowerQuery = query.toLowerCase();
        return contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(lowerQuery) ||
                contact.phone.includes(lowerQuery)
        );
    }, [query, contacts]);

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.name.trim() || !form.phone.trim()) {
            alert("Please fill in both Name and Phone fields.");
            return;
        }

        const isDuplicate = contacts.some(
            (contact) =>
                contact.name.toLowerCase() === form.name.toLowerCase() ||
                contact.phone === form.phone
        );
        if (isDuplicate) {
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

        setContacts((prev) => [...prev, newContact]);
        setForm({ name: "", phone: "", email: "" });
        alert(`Added ${newContact.name} to your contacts!`);
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Phonebook Challenge</h1>
                <p className="page__subtitle">Build a simple contact directory</p>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by Name or Phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {filteredContacts.length}{" "}
                    {filteredContacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
                <ul className="contacts__list">
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => (
                            <li key={contact.id} className="contact-card">
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
                        <p>No contacts found.</p>
                    )}
                </ul>
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>
                    </div>
                </form>
            </section>

            <footer className="page__footer">
                <small>
                    Starter provided. Complete tasks per README and make this page shine.
                </small>
            </footer>
        </main>
    );
};

export default App;