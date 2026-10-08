import { useState, type FormEvent } from 'react';
import { Icon } from '../../components/Icon';
import { SectionHead } from '../../components/SectionHead';
import { PROFILE } from '../../data/profile';
import { copyEmail } from '../../lib/ui';

const TOPICS = [
    { id: 'full-time', label: 'Full-time role' },
    { id: 'freelance', label: 'Freelance project' },
    { id: 'collab', label: 'Collaboration' },
    { id: 'hello', label: 'Just saying hi' },
] as const;

type Topic = (typeof TOPICS)[number]['id'];

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Live JSON preview of the "request" — empty fields show their placeholder, dimmed. */
function payloadHtml(fields: { key: string; value: string; placeholder: string }[]) {
    const rows = fields.map(({ key, value, placeholder }, index) => {
        const text = value.trim() ? JSON.stringify(value.trim()) : `"${placeholder}"`;
        const valueClass = value.trim() ? 'tok-str' : 'tok-com';
        const comma = index < fields.length - 1 ? ',' : '';
        return `  <span class="tok-prop">"${key}"</span>: <span class="${valueClass}">${escapeHtml(text)}</span>${comma}`;
    });
    return ['{', ...rows, '}'].join('\n');
}

export function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState<Topic>('full-time');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const topicLabel = TOPICS.find((item) => item.id === topic)?.label ?? '';

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const subject = `[${topicLabel}] from ${name.trim()}`;
        const body = `${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`;
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
    };

    return (
        <section id="contact" className="section container">
            <SectionHead
                index="07"
                label="Contact"
                title={
                    <>
                        Let’s build <span className="serif">something.</span>
                    </>
                }
            />

            <div className="contact">
                <div className="contact__intro">
                    <p className="contact__lede">
                        Hiring for a full stack role, or have a product that needs building end to end? Send a request — I
                        usually reply within 24–48 hours.
                    </p>

                    <ul className="contact__channels">
                        <li>
                            <span className="mini-title">Email</span>
                            <span className="contact__row">
                                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                                <button type="button" className="icon-button icon-button--sm" onClick={copyEmail} aria-label="Copy email address">
                                    <Icon name="copy" size={16} />
                                </button>
                            </span>
                        </li>
                        <li>
                            <span className="mini-title">LinkedIn</span>
                            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                                in/rahul-kbharti <Icon name="arrowUpRight" size={14} />
                            </a>
                        </li>
                        <li>
                            <span className="mini-title">GitHub</span>
                            <a href={PROFILE.github} target="_blank" rel="noreferrer">
                                @rahulkbharti <Icon name="arrowUpRight" size={14} />
                            </a>
                        </li>
                    </ul>
                </div>

                <form className="request" onSubmit={onSubmit}>
                    <div className="request__bar">
                        <span className="request__method">POST</span>
                        <span className="request__path mono">/v1/hire/rahul</span>
                    </div>

                    <div className="request__grid">
                        <div className="request__fields">
                            <div className="field-row">
                                <label className="field">
                                    <span>Name</span>
                                    <input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Ada Lovelace" />
                                </label>
                                <label className="field">
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        autoComplete="email"
                                        placeholder="ada@company.com"
                                    />
                                </label>
                            </div>

                            <fieldset className="field">
                                <legend>What’s this about?</legend>
                                <div className="topic-group">
                                    {TOPICS.map((item) => (
                                        <label key={item.id} className="topic">
                                            <input type="radio" name="topic" value={item.id} checked={topic === item.id} onChange={() => setTopic(item.id)} />
                                            <span>{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <label className="field">
                                <span>Message</span>
                                <textarea
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    required
                                    rows={5}
                                    placeholder="What are you building, and where could I help?"
                                />
                            </label>
                        </div>

                        <pre
                            className="request__payload"
                            aria-hidden="true"
                            dangerouslySetInnerHTML={{
                                __html: payloadHtml([
                                    { key: 'name', value: name, placeholder: 'your name' },
                                    { key: 'email', value: email, placeholder: 'you@company.com' },
                                    { key: 'topic', value: topic, placeholder: '' },
                                    { key: 'message', value: message, placeholder: '…' },
                                ]),
                            }}
                        />
                    </div>

                    <div className="request__foot">
                        <span className="mono request__header">Content-Type: application/json</span>
                        <button type="submit" className="btn btn--primary">
                            Send request <Icon name="arrowRight" />
                        </button>
                    </div>

                    {sent && (
                        <p className="request__response" role="status">
                            <span className="request__status mono">202 Accepted</span>
                            Your email app should open with the message filled in. Nothing happened?{' '}
                            <button type="button" className="link-button" onClick={copyEmail}>
                                Copy my email instead
                            </button>
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
