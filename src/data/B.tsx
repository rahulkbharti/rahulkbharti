import { useEffect, type JSX } from "react";

// Type augmentation so TypeScript doesn't complain about window.MathJax
declare global {
    interface Window {
        MathJax?: any;
    }
}

export default function NeuralNetworkBackprop(): JSX.Element {
    useEffect(() => {
        // Configure MathJax before the script loads (if not already configured)
        if (!window.MathJax) {
            (window as any).MathJax = {
                tex: {
                    inlineMath: [["$", "$"], ["\\(", "\\)"]],
                    displayMath: [["$$", "$$"], ["\\[", "\\]"]]
                },
                chtml: {
                    displayAlign: "left"
                },
                processEscapes: true
            };
        }

        // If script not present, inject it
        const id = "mathjax-script";
        if (!document.getElementById(id)) {
            const script = document.createElement("script");
            script.id = id;
            script.async = true;
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
            script.onload = () => {
                // typeset any math once MathJax loads
                window.MathJax?.typesetPromise?.();
            };
            document.head.appendChild(script);
        } else {
            // If already loaded, just re-typeset the page
            window.MathJax?.typesetPromise?.();
        }

        // When component unmounts, we don't remove MathJax because other parts of the app may use it.
    }, []);

    // Minor helper: run a re-typeset when the component renders (safe no-op if MathJax not ready yet)
    useEffect(() => {
        window.MathJax?.typesetPromise?.();
    });

    return (
        <main className="nn-article" style={{ maxWidth: 800, margin: "20px auto", padding: "0 20px", color: "#333" }}>
            <h2>Understanding Neural Network Backpropagation: A Mathematical Perspective</h2>

            <p>
                Hello, tech enthusiasts! Welcome back. Today, I’m excited to dive into one of the core concepts of deep
                learning: <b>backpropagation in neural networks.</b> This is the "magic" that allows a network to learn from its
                mistakes.
            </p>

            <p>
                This post will break down the mathematical foundations of backpropagation, helping you understand how neural
                networks <em>actually</em> learn from data. We will derive the gradient equations from scratch for a simple
                four-layer neural network (one input, two hidden, one output).
            </p>

            <h3>The Setup: Our Network &amp; Notations</h3>
            <p>Here is the architecture we will be analyzing:</p>
            <img alt="A 4-layer neural network with 3, 2, 2, 2 neurons" src="/img/Neural Network Original.png" style={{ width: "100%" }} />

            <p><b>Notations:</b></p>

            <ul>
                <li>
                    <b>Activation Function:</b> We'll use the Sigmoid function.
                    <div>
                        <div>{`$$ \sigma(z) = \frac{1}{1+e^{-z}} $$`}</div>
                        <div>{`$$ \sigma'(z) = \sigma(z)(1 - \sigma(z)) $$`}</div>
                    </div>
                </li>
                <li>
                    <b>Activations &amp; Pre-Activations:</b>
                    <ul>
                        <li>{`$z^{(l)}_j$ is the pre-activation (weighted sum + bias) of the $j^{th}$ neuron in layer $l$.`}</li>
                        <li>{`$a^{(l)}_j = \sigma(z^{(l)}_j)$`} is the activation (the output) of that neuron.</li>
                    </ul>
                </li>
                <li>
                    <b>Loss Function:</b> We'll use the <b>Sum of Squared Errors (SSE)</b> for a single example.
                    <div>{`$$ C_x = \frac{1}{2} \left[ (\widehat{a}_{1} - a_1^{(4)})^2+(\widehat{a}_{2} - a_2^{(4)})^2 \right] $$`}</div>
                </li>
                <li>
                    <b>The Goal:</b> Our goal is to find the gradient of the cost $C_x$ with respect to every weight $w$ and bias $b$.
                </li>
            </ul>

            <hr />

            <h3>Part 1: The Output Layer (Layer 4)</h3>
            <p>Let's start at the end: how does a weight in the <em>output layer</em>, like <code>w_{11}^{(4)}</code>, affect the cost?</p>
            <img src="/img/Neural Network Layer 4.png" alt="A diagram focusing on layer 4" style={{ width: "100%" }} />

            <blockquote>
                <b>The Chain of Influence:</b>
                <p>
                    $w_{11}^{(4)}$ affects $z_1^{(4)}$ → $z_1^{(4)}$ affects $a_1^{(4)}$ → $a_1^{(4)}$ affects the Cost $C_x$.
                </p>
                <div>{`$$ C_x \\xleftarrow{(\widehat{a}_1 - a_1^{(4)})^2} a_1^{(4)} \\xleftarrow{\\sigma(z_1^{(4)})} z_1^{(4)} \\xleftarrow{\\text{...}} w_{11}^{(4)} $$`}</div>
            </blockquote>

            <p>Using the chain rule, we can write this relationship mathematically:</p>
            <div>{`$$ \displaystyle \frac{\partial C_x}{\partial w_{11}^{(4)}} = \frac{\partial C_x}{\partial a_1^{(4)}} \cdot \frac{\partial a_1^{(4)}}{\partial z_1^{(4)}} \cdot \frac{\partial z_1^{(4)}}{\partial w_{11}^{(4)}} $$`}</div>

            {/* Several more mathematical derivations follow — render them as text + LaTeX blocks for MathJax */}

            <fieldset style={{ border: "1px solid #ddd", borderRadius: 5, margin: "20px 0", backgroundColor: "#fcfcfc", padding: "10px 20px" }}>
                <legend><b>Derivative of sigmoid function(Activation Function):</b></legend>
                <p>The sigmoid function is:</p>
                <div>{`$$ \sigma(x) = \frac{1}{1+e^{-x}} $$`}</div>
                <p>The derivative of the sigmoid function is:</p>
                <div>{`$$ \sigma'(x) = \frac{e^{-x}}{(1+e^{-x})^2} = \sigma(x)(1-\sigma(x)) $$`}</div>
            </fieldset>

            <hr />

            <h3>Part 2: The Hidden Layer (Layer 3)</h3>
            <p>Now for the tricky part. How does a weight in a hidden layer, like <code>w_{11}^{(3)}</code>, affect the cost?</p>
            <img src="/img/Neural Network Layer 3.png" alt="A diagram focusing on layer 3" style={{ width: "100%" }} />

            <blockquote>
                <b>The Forking Paths:</b>
                <p>$w_{11}^{(3)}$ → $z_1^{(3)}$ → $a_1^{(3)}$ ...</p>
                <p>{`... $a_1^{(3)}$ → $z_1^{(4)}$ → $a_1^{(4)}$ → $C_{x_1}$ (Cost part 1)`}</p>
                <p>{`... $a_1^{(3)}$ → $z_2^{(4)}$ → $a_2^{(4)}$ → $C_{x_2}$ (Cost part 2)`}</p>
            </blockquote>

            <p>The total gradient is the sum of the gradients from all paths. The rest of the derivation follows the same
                chain-rule steps and leads to the familiar matrix forms and the four backpropagation equations.</p>

            <hr />

            <h3>Conclusion: The Four Backpropagation Equations</h3>

            <fieldset style={{ border: "1px solid #ddd", borderRadius: 5, margin: "20px 0", backgroundColor: "#fcfcfc", padding: "10px 20px" }}>
                <legend><b>The Four Backpropagation Equations</b></legend>
                <p>Repeat the forward pass, compute deltas from the output layer backwards, compute gradients, and update weights.</p>
            </fieldset>

            <p>Starting from the last layer (L), we use the chain rule, then go backward layer-by-layer to compute
                parameter updates. That's how a neural network learns!</p>

            {/* Inline styles similar to the original CSS for headings and blockquote */}
            <style>{`
        h2, h3 { color: #111; }
        h3 { color: #005a9c; }
        blockquote { border-left: 4px solid #005a9c; background-color: #f9f9f9; padding: 10px 20px; margin: 20px 0; font-style: italic; }
        img { max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; }
        hr { border: 0; height: 1px; background: #ddd; margin: 40px 0; }
        fieldset legend b { font-size: 1.1em; color: #005a9c; }
      `}</style>
        </main>
    );
}
