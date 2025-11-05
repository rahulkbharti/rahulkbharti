// BlogBackprop.jsx
import { useEffect, useMemo, useRef, useState } from "react";

// Extend Window interface to include MathJax
declare global {
    interface Window {
        MathJax?: any;
    }
}

export default function BlogBackprop() {
    const containerRef = useRef(null);
    const [mjReady, setMjReady] = useState(false);

    // MathJax loader (runs once)
    useEffect(() => {
        // If MathJax already present, just mark ready
        if (window.MathJax && window.MathJax.typesetPromise) {
            setMjReady(true);
            return;
        }

        // MathJax global config (v3)
        window.MathJax = {
            tex: {
                inlineMath: [["$", "$"], ["\\(", "\\)"]],
                displayMath: [["$$", "$$"], ["\\[", "\\]"]],
            },
            chtml: {
                displayAlign: "left",
            },
            options: {
                processEscapes: true,
            },
        };

        // Inject script
        const script = document.createElement("script");
        script.id = "MathJax-script";
        script.async = true;
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
        script.onload = () => setMjReady(true);
        script.onerror = () => console.error("Failed to load MathJax.");
        document.head.appendChild(script);

        return () => {
            // optional cleanup: do not remove script so other pages can reuse it
        };
    }, []);

    // Typeset on mount/ready
    useEffect(() => {
        if (!mjReady || !containerRef.current) return;
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([containerRef.current]).catch((err: any) =>
                console.error("MathJax typeset error:", err)
            );
        }
    }, [mjReady]);

    // Your HTML content (body only)
    const html = useMemo(
        () => `
   
    <p>
      Hello, tech enthusiasts! Welcome back. Today, I’m excited to dive into one of the
      core concepts of deep learning: <b>backpropagation in neural networks.</b> This is the "magic" that allows a
      network to learn from its mistakes.
    </p>
    <p>
      This post will break down the
      mathematical foundations of backpropagation, helping you understand how neural networks *actually* learn from
      data. We will derive the gradient equations from scratch for a simple four-layer neural network (one input, two
      hidden, one output).
    </p>

    <h3>The Setup: Our Network & Notations</h3>
    <p>Here is the architecture we will be analyzing:</p>
    <img alt="A 4-layer neural network with 3, 2, 2, 2 neurons" src="/rahulkbharti/blogs/Neural Network Original.png" width="100%" />
    <p><b>Notations:</b></p>
    <ul>
      <li><b>Activation Function:</b> We'll use the Sigmoid function.
        $$ \\sigma(z) = \\frac{1}{1+e^{-z}} $$
        Its derivative is:
        $$ \\sigma'(z) = \\sigma(z)(1 - \\sigma(z)) $$
      </li>
      <li><b>Activations & Pre-Activations:</b>
        <ul>
          <li>$z^{(l)}_j$ is the pre-activation (weighted sum + bias) of the $j^{th}$ neuron in layer $l$.</li>
          <li>$a^{(l)}_j = \\sigma(z^{(l)}_j)$ is the activation (the output) of that neuron.</li>
        </ul>
      </li>
      <li><b>Loss Function:</b> We'll use the <b>Sum of Squared Errors (SSE)</b> for a single example. The
        $\\frac{1}{2}$ is a mathematical convenience that will make our derivative cleaner.
        $$ C_x = \\frac{1}{2} \\left[ (\\widehat{a}_{1} - a_1^{(4)})^2+(\\widehat{a}_{2} - a_2^{(4)})^2 \\right] $$
        Here, $\\widehat{a}$ is the "true" target value, and $a^{(4)}$ is our network's prediction.
      </li>
      <li><b>The Goal:</b> Our goal is to find the gradient of the cost $C_x$ with respect to every weight $w$ and
        bias $b$ in the network. We need this for the <b>Gradient Descent</b> update rule:
        $$ w_{new} = w_{old} - \\eta \\frac{\\partial C_x}{\\partial w} $$
      </li>
    </ul>

    <hr>

    <h3>Part 1: The Output Layer (Layer 4)</h3>
    <p>
      Let's start at the end: how does a weight in the <i>output layer</i>, like $w_{11}^{(4)}$, affect the cost?
    </p>
    <img src="/rahulkbharti/blogs/Neural Network Layer 4.png" alt="A diagram focusing on layer 4" width="100%">
    <blockquote>
      <b>The Chain of Influence:</b>
      <p>
        $w_{11}^{(4)}$ affects $z_1^{(4)}$ $\\rightarrow$ $z_1^{(4)}$ affects $a_1^{(4)}$ $\\rightarrow$ $a_1^{(4)}$
        affects the Cost $C_x$.
      </p>
      $$
      C_x \\xleftarrow{(\\widehat{a}_1 - a_1^{(4)})^2} a_1^{(4)} \\xleftarrow{\\sigma(z_1^{(4)})} z_1^{(4)}
      \\xleftarrow{\\text{...}} w_{11}^{(4)}
      $$
    </blockquote>
    <p>Using the chain rule, we can write this relationship mathematically:</p>
    $$
    \\boxed{\\frac{\\partial C_x}{\\partial w_{11}^{(4)}} = \\frac{\\partial C_x}{\\partial a_1^{(4)}} \\cdot \\frac{\\partial
    a_1^{(4)}}{\\partial z_1^{(4)}} \\cdot \\frac{\\partial z_1^{(4)}}{\\partial w_{11}^{(4)}}} \\tag{1}
    $$
    <p>Let's calculate each of those three parts:</p>
    <p><b>(i) How Cost changes with Activation:</b></p>
    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial a_1^{(4)}} &= \\frac{\\partial}{\\partial a_1^{(4)}} \\left[ \\frac{1}{2} (\\widehat{a}_{1} -
    a_1^{(4)})^2 + \\dots \\right] \\\\
    &= \\frac{1}{2} \\cdot 2 (\\widehat{a}_{1} - a_1^{(4)}) \\cdot (-1) \\\\
    &= (a_1^{(4)} - \\widehat{a}_{1})
    \\end{aligned} \\tag{i}
    $$
    <p><b>(ii) How Activation changes with Pre-Activation:</b></p>
    $$
    \\begin{aligned}
    \\frac{\\partial a_1^{(4)}}{\\partial z_1^{(4)}} = \\frac{\\partial \\sigma(z_1^{(4)})}{\\partial z_1^{(4)}} =
    \\sigma'(z_1^{(4)})
    \\end{aligned} \\tag{ii}
    $$
    <p><b>(iii) How Pre-Activation changes with Weight:</b></p>
    $$
    \\begin{aligned}
    \\frac{\\partial z_1^{(4)}}{\\partial w_{11}^{(4)}} &= \\frac{\\partial}{\\partial w_{11}^{(4)}} \\left[ w_{11}^{(4)}
    a_1^{(3)} + w_{12}^{(4)} a_2^{(3)} + b_1^{(4)} \\right] \\\\
    &= a_1^{(3)} + 0 + 0
    \\end{aligned} \\tag{iii}
    $$
    <p><b>Putting it all together:</b></p>
    <p>Substitute (i), (ii), and (iii) back into (1):</p>
    $$
    \\frac{\\partial C_x}{\\partial w_{11}^{(4)}} = (a_1^{(4)} - \\widehat{a}_{1}) \\cdot \\sigma'(z_1^{(4)}) \\cdot a_1^{(3)}
    $$

    <fieldset border="1">
      <legend><b>Derivative of sigmoid function(Activation Function):</b></legend>
      <p>The sigmoid function is:</p>
      $$
      \\sigma(x) = \\frac{1}{1+e^{-x}}
      $$
      <p>The derivative of the sigmoid function is:</p>
      $$
      \\begin{aligned}
      \\sigma'(x) &= \\frac{e^{-x}}{(1+e^{-x})^2} \\\\
      \\sigma'(x) &= \\sigma(x)(1 - \\sigma(x))
      \\end{aligned}
      $$
      <p>Putting the value of the function:</p>
      $$
      \\begin{aligned}
      \\sigma'(z_1^{(4)}) &= \\sigma(z_1^{(4)})(1 - \\sigma(z_1^{(4)})) \\\\
      &= a_1^{(4)}(1 - a_1^{(4)})
      \\end{aligned}
      $$
    </fieldset>

    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial w_{11}^{(4)}} &= (\\widehat{a} - a_1^{(4)}) \\cdot a_1^{(4)}(1 - a_1^{(4)}) \\cdot
    a_1^{(3)}
    \\end{aligned} \\tag{2}
    $$

    Similarly, If you calculate you will get :

    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial w_{12}^{(4)}} &= (\\widehat{a} - a_1^{(4)}) \\cdot a_1^{(4)}(1 - a_1^{(4)}) \\cdot
    a_2^{(3)}
    \\end{aligned} \\tag{3}
    $$

    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial w_{21}^{(4)}} &= (\\widehat{a} - a_2^{(4)}) \\cdot a_2^{(4)}(1 - a_2^{(4)}) \\cdot
    a_2^{(3)}
    \\end{aligned} \\tag{4}
    $$

    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial w_{22}^{(4)}} &= (\\widehat{a} - a_2^{(4)}) \\cdot a_2^{(4)}(1 - a_2^{(4)}) \\cdot
    a_2^{(3)}
    \\end{aligned} \\tag{5}
    $$

    You will Notice Some Pattern In it :
    we can Say that :
    $$
    \\boxed{
    \\delta_1^{(4)} = \\frac{\\partial C_x}{\\partial z_1^{(4)}} = 2(\\widehat{a} - a_1^{(4)}) \\cdot a_1^{(4)}(1 - a_1^{(4)})
    } \\tag{6}
    $$
    $$
    \\boxed{
    \\delta_2^{(4)} = \\frac{\\partial C_x}{\\partial z_2^{(4)}} = 2(\\widehat{a} - a_2^{(4)}) \\cdot a_2^{(4)}(1 - a_2^{(4)})
    } \\tag{7}
    $$

    <p>With this new definition, our gradient calculation becomes beautifully simple:</p>
    $$
    \\frac{\\partial C_x}{\\partial w_{11}^{(4)}} = \\delta_1^{(4)} \\cdot a_1^{(3)}
    $$
    $$
    \\frac{\\partial C_x}{\\partial w_{12}^{(4)}} = \\delta_1^{(4)} \\cdot a_2^{(3)}
    $$
    $$
    \\frac{\\partial C_x}{\\partial b_1^{(4)}} = \\frac{\\partial C_x}{\\partial z_1^{(4)}} \\cdot \\frac{\\partial
    z_1^{(4)}}{\\partial b_1^{(4)}} = \\delta_1^{(4)} \\cdot 1 = \\delta_1^{(4)}
    $$

    $$
    \\frac{\\partial C_x}{\\partial w_{21}^{(4)}} = \\delta_2^{(4)} \\cdot a_1^{(3)}
    $$
    $$
    \\frac{\\partial C_x}{\\partial w_{22}^{(4)}} = \\delta_2^{(4)} \\cdot a_2^{(3)}
    $$
    $$
    \\frac{\\partial C_x}{\\partial b_2^{(4)}} = \\frac{\\partial C_x}{\\partial z_2^{(4)}} \\cdot \\frac{\\partial
    z_2^{(4)}}{\\partial b_2^{(4)}} = \\delta_2^{(4)} \\cdot 1 = \\delta_2^{(4)}
    $$
    <p><b>In Matrix Form (for all of Layer 4):</b></p>

    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial W^{(4)}}
    &=
    \\begin{bmatrix}
    \\frac{\\partial C_x}{\\partial w_{11}^{(4)}} & \\frac{\\partial C_x}{\\partial w_{12}^{(4)}} \\\\
    \\frac{\\partial C_x}{\\partial w_{21}^{(4)}} & \\frac{\\partial C_x}{\\partial w_{22}^{(4)}}
    \\end{bmatrix}_{2 \\times 2} \\\\
    &=
    \\begin{bmatrix}
    \\delta_1^{(4)} \\cdot a_1^{(3)} & \\delta_1^{(4)} \\cdot a_2^{(3)} \\\\
    \\delta_2^{(4)} \\cdot a_1^{(3)} & \\delta_2^{(4)} \\cdot a_2^{(3)}
    \\end{bmatrix}_{2 \\times 2} \\\\
    &=
    \\begin{bmatrix}
    \\delta_1^{(4)} \\\\
    \\delta_2^{(4)}
    \\end{bmatrix}_{2 \\times 1}
    \\times
    \\begin{bmatrix}
    a_1^{(3)} & a_2^{(3)}
    \\end{bmatrix}_{1 \\times 2}
    \\end{aligned}
    $$

    $$
    \\boxed{\\frac{\\partial C_x}{\\partial W^{(4)}} = \\left[\\delta^{(4)}\\right] \\left[A^{(4)}\\right]^{T}} \\quad \\text{and}
    \\quad
    \\boxed{\\frac{\\partial C_x}{\\partial B^{(4)}} = \\delta^{(4)} }
    $$

    <hr>

    <h3>Part 2: The Hidden Layer (Layer 3)</h3>
    <p>Now for the tricky part. How does a weight in a hidden layer, like $w_{11}^{(3)}$, affect the cost? The key is
      that $w_{11}^{(3)}$ affects $a_1^{(3)}$, which then affects <i>all</i> neurons in the next layer (Layer 4).</p>
    <img src="/rahulkbharti/blogs/Neural Network Layer 3.png" alt="A diagram focusing on layer 3" width="100%">
    <blockquote>
      <b>The Forking Paths:</b>
      <p>
        $w_{11}^{(3)}$ $\\rightarrow$ $z_1^{(3)}$ $\\rightarrow$ $a_1^{(3)}$ ...
      </p>
      <p>
        ... $a_1^{(3)}$ $\\rightarrow$ $z_1^{(4)}$ $\\rightarrow$ $a_1^{(4)}$ $\\rightarrow$ $C_{x_1}$ (Cost part 1)
        <br>
        ... $a_1^{(3)}$ $\\rightarrow$ $z_2^{(4)}$ $\\rightarrow$ $a_2^{(4)}$ $\\rightarrow$ $C_{x_2}$ (Cost part 2)
      </p>
    </blockquote>
    <p>The total gradient is the sum of the gradients from all paths:</p>
    $$
    \\frac{\\partial C_x}{\\partial w_{11}^{(3)}} = \\frac{\\partial C_{x_1}}{\\partial w_{11}^{(3)}} + \\frac{\\partial
    C_{x_2}}{\\partial w_{11}^{(3)}}
    $$
    <p>Let's trace Path 1 using the chain rule:</p>
    $$
    \\begin{aligned}
    \\frac{\\partial C_{x_1}}{\\partial w_{11}^{(3)}} &=
    \\frac{\\partial C_{x_1}}{\\partial a_1^{(4)}} \\cdot
    \\frac{\\partial a_1^{(4)}}{\\partial z_1^{(4)}} \\cdot
    \\frac{\\partial z_1^{(4)}}{\\partial a_1^{(3)}} \\cdot
    \\frac{\\partial a_1^{(3)}}{\\partial z_1^{(3)}} \\cdot
    \\frac{\\partial z_1^{(3)}}{\\partial w_{11}^{(3)}} \\\\

    &= 
    \\frac{\\partial C_{x_1}}{\\partial a_1^{(4)}} \\cdot
    \\frac{\\partial a_1^{(4)}}{\\partial z_1^{(4)}} \\cdot
    \\frac{\\partial z_1^{(4)}}{\\partial a_1^{(3)}} \\cdot
    \\frac{\\partial a_1^{(3)}}{\\partial z_1^{(3)}} \\cdot
    a_1^{(2)} \\\\

    &=
    \\frac{\\partial C_{x_1}}{\\partial a_1^{(4)}} \\cdot
    \\frac{\\partial a_1^{(4)}}{\\partial z_1^{(4)}} \\cdot
    \\frac{\\partial z_1^{(4)}}{\\partial a_1^{(3)}} \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot
    a_1^{(2)} \\\\

    &=
    \\frac{\\partial C_{x_1}}{\\partial a_1^{(4)}} \\cdot
    \\frac{\\partial a_1^{(4)}}{\\partial z_1^{(4)}} \\cdot
    w_{11}^{(4)} \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot
    a_1^{(2)} \\\\

    &=
    \\frac{\\partial C_{x_1}}{\\partial a_1^{(4)}} \\cdot
    a_1^{(4)} \\cdot (1 - a_1^{(4)}) \\cdot
    w_{11}^{(4)} \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot
    a_1^{(2)} \\\\

    &=
    \\overbrace{
    2(\\widehat{a} - a_1^{(4)}) \\cdot
    a_1^{(4)} \\cdot (1 - a_1^{(4)}) \\cdot
    }^{ \\delta_1^{(4)}}
    \\overbrace{
    w_{11}^{(4)} \\cdot
    }^{ w_{11}^{(4)}}
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot
    a_1^{(2)} \\\\
    &= \\delta_1^{(4)} \\cdot w_{11}^{(4)} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_1^{(2)}

    \\end{aligned}
    $$
    <p>And Path 2:</p>
    $$
    \\begin{aligned}
    \\frac{\\partial C_{x_2}}{\\partial w_{11}^{(3)}} &=
    \\frac{\\partial C_x}{\\partial a_1^{(4)}} \\cdot \\frac{\\partial a_1^{(4)}}{\\partial z_1^{(4)}} \\cdot \\frac{\\partial
    z_1^{(4)}}{\\partial a_1^{(3)}} \\cdot \\frac{\\partial a_1^{(3)}}{\\partial z_1^{(3)}} \\cdot \\frac{\\partial
    z_1^{(3)}}{\\partial w_{11}^{(3)}} \\\\

    \\dots \\\\

    &= \\delta_2^{(4)} \\cdot w_{21}^{(4)} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_1^{(2)}

    \\end{aligned}
    $$
    <p>Now add them and factor out the common terms:</p>
    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial w_{11}^{(3)}} &= \\frac{\\partial C_{x_1}}{\\partial w_{11}^{(3)}} +\\frac{\\partial
    C_{x_2}}{\\partial w_{11}^{(3)}} \\\\

    &= \\delta_1^{(4)} \\cdot w_{11}^{(4)} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_1^{(2)} +
    \\delta_2^{(4)} \\cdot w_{21}^{(4)} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_1^{(2)} \\\\

    &= \\left[ \\delta_1^{(4)} \\cdot w_{11}^{(4)} + \\delta_2^{(4)} \\cdot w_{21}^{(4)} \\right] \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_1^{(2)} \\\\

    &= \\left[\\sum_{k=1}^{2} \\delta_{k}^{(4)} \\cdot w_{k1}^{(4)} \\right] \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_1^{(2)} \\\\
    \\end{aligned}
    $$

    Similarly,
    $$
    \\frac{\\partial C_x}{\\partial w_{12}^{(3)}} = \\left[\\sum_{k=1}^{2} \\delta_{k}^{(4)} \\cdot w_{k1}^{(4)} \\right]
    \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\cdot a_2^{(2)} \\\\
    $$

    By Doing this you will Also Get this Pattern :
    $$
    \\begin{aligned}
    \\delta_1^{(3)} = \\left[\\sum_{k=1}^{2} \\delta_{k}^{(4)} \\cdot w_{k1}^{(4)} \\right] \\cdot
    a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\\\
    \\text{similarly,} \\\\

    \\delta_2^{(3)} = \\left[\\sum_{k=1}^{2} \\delta_{k}^{(4)} \\cdot w_{k2}^{(4)} \\right] \\cdot
    a_2^{(3)} \\cdot (1 - a_2^{(3)}) \\\\
    \\end{aligned}
    $$

    In Matrix Form (for all of Layer 3):
    $$
    \\begin{aligned}
    \\frac{\\partial C_x}{\\partial W^{(3)}}
    &=
    \\begin{bmatrix}
    \\frac{\\partial C_x}{\\partial w_{11}^{(3)}} & \\frac{\\partial C_x}{\\partial w_{12}^{(3)}} \\\\
    \\frac{\\partial C_x}{\\partial w_{21}^{(3)}} & \\frac{\\partial C_x}{\\partial w_{22}^{(3)}}
    \\end{bmatrix}_{2 \\times 2} \\\\
    &=
    \\begin{bmatrix}
    \\delta_1^{(3)} \\cdot a_1^{(2)} & \\delta_1^{(3)} \\cdot a_2^{(2)} \\\\
    \\delta_2^{(3)} \\cdot a_1^{(2)} & \\delta_2^{(3)} \\cdot a_2^{(2)}
    \\end{bmatrix}_{2 \\times 2} \\\\
    &=
    \\begin{bmatrix}
    \\delta_1^{(3)} \\\\
    \\delta_2^{(3)}
    \\end{bmatrix}_{2 \\times 1}
    \\times
    \\begin{bmatrix}
    a_1^{(2)} & a_2^{(2)}
    \\end{bmatrix}_{1 \\times 2}
    \\end{aligned}
    $$

    $$
    \\boxed{\\frac{\\partial C_x}{\\partial W^{(3)}} = \\left[\\delta^{(3)}\\right] \\left[A^{(3)}\\right]^{T}} \\quad \\text{and}
    \\quad
    \\boxed{\\frac{\\partial C_x}{\\partial B^{(3)}} = \\delta^{(3)} }
    $$
    <p>This gives us the definition for our hidden layer error, $\\delta^{(3)}$!</p>
    <blockquote>
      <b>Definition: Hidden Error $\\delta^{(l)}$</b>
      <p>The error at a hidden neuron $j$ is the sum of the errors from the <i>next</i> layer ($\\delta^{(l+1)}$), weighted
        by the connections ($w^{(l+1)}$) coming back to it, all multiplied by the local gradient $\\sigma'(z^{(l)})$.
      </p>
      $$
      \\delta_j^{(l)} \\equiv \\frac{\\partial C_x}{\\partial z_j^{(l)}} = \\left[ \\sum_{k} \\delta_{k}^{(l+1)}
      w_{kj}^{(l+1)} \\right] \\cdot \\sigma'(z_j^{(l)})
      $$
      $$
      \\begin{align*}
      \\boxed{
      \\delta_j^{(l)} = \\left[ \\sum_{k=1}^{n} \\delta_k^{(l+1)} \\cdot w_{kj}^{(l+1)} \\right] \\cdot a_j^{(l)} \\cdot
      (1 -a_j^{(l)})
      } \\\\
      \\text{OR} \\\\
      \\boxed{
      \\delta_j^{(l)} = \\left[ \\sum_{k=1}^{n} \\delta_k^{(l+1)} \\cdot w_{jk}^{(l+1)^{T}} \\right] \\cdot a_j^{(l)} \\cdot
      (1 -a_j^{(l)})
      }
      \\end{align*}
      $$
      \\begin{align*}
      \\text{where:} \\\\
      \\delta_j^{(l)} &: \\text{delta of the } j^{th}\\text{ neuron in layer } l \\\\
      a_k^{(l-1)} &: \\text{activation of the } k^{th}\\text{ neuron in layer } l-1 \\\\
      w_{jk}^{(l)} &: \\text{weight from the } k^{th}\\text{neuron in layer } l-1 \\text{ to the } j^{th} \\text{neuron in
      layer } l \\\\
      b_j^{(l)} &: \\text{bias of the } j^{th}\\text{ neuron in layer } l \\\\
      \\end{align*}
    </blockquote>

    <fieldset>
      Calculating $ \\delta^{l} $ if we know $ \\delta^{l+1} $:
      $$
      \\begin{aligned}
      \\delta^{(3)}
      &=
      \\begin{bmatrix}
      \\delta_1^{(3)} \\\\
      \\delta_2^{(3)}
      \\end{bmatrix} \\\\
      &=
      \\begin{bmatrix}
      \\left[ \\delta_1^{(4)} \\cdot w_{11}^{(4)} + \\delta_2^{(4)} \\cdot w_{21}^{(4)} \\right] \\cdot
      a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\\\
      \\left[ \\delta_1^{(4)} \\cdot w_{12}^{(4)} + \\delta_2^{(4)} \\cdot w_{22}^{(4)} \\right] \\cdot
      a_1^{(3)} \\cdot (1 - a_1^{(3)})
      \\end{bmatrix} \\\\
      &=
      \\begin{bmatrix}
      \\delta_1^{(4)} \\cdot w_{11}^{(4)} + \\delta_2^{(4)} \\cdot w_{21}^{(4)} \\\\
      \\delta_1^{(4)} \\cdot w_{12}^{(4)} + \\delta_2^{(4)} \\cdot w_{22}^{(4)}
      \\end{bmatrix} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\\\
      &=
      \\begin{bmatrix}
      w_{11}^{(4)} & w_{21}^{(4)} \\\\
      w_{12}^{(4)} & w_{22}^{(4)}
      \\end{bmatrix}
      \\cdot
      \\begin{bmatrix}
      \\delta_1^{(4)} & \\delta_2^{(4)}
      \\end{bmatrix} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\\\
      &=
      \\begin{bmatrix}
      w_{11}^{(4)} & w_{12}^{(4)} \\\\
      w_{21}^{(4)} & w_{22}^{(4)}
      \\end{bmatrix}^{T}
      \\cdot
      \\begin{bmatrix}
      \\delta_1^{(4)} \\\\
      \\delta_2^{(4)}
      \\end{bmatrix} \\cdot a_1^{(3)} \\cdot (1 - a_1^{(3)}) \\\\
      \\end{aligned}
      $$
      $$
      \\begin{aligned}
      \\boxed{
      \\delta^{(3)} = W^{(4)T} \\cdot \\delta^{(4)} \\cdot \\sigma'(z^{(3)})
      } \\\\
      \\text{Thus, For any layer delta rather than output layer:} \\\\
      \\boxed{
      \\delta^{(l)} = W^{(l+1)T} \\cdot \\delta^{(l+1)} \\cdot \\sigma'(z^{(l)})
      }
      \\end{aligned}
      $$
    </fieldset>

    <hr>

    <h3>Conclusion: The Four Backpropagation Equations</h3>
    <p>We've done it! We have derived the core logic of backpropagation. This entire process can be summarized into four
      fundamental equations. To train a network, we just repeat these steps:</p>

    <fieldset>
      <legend><b>The Four Backpropagation Equations</b></legend>
      Updating The Weights and Biases Examples:
      $$
      w_{new}^{(4)} = w_{old}^{(4)} - \\eta \\cdot \\frac{\\partial C_x}{\\partial w_{old}^{(4)}}
      $$

      $$
      \\frac{\\partial C_x}{\\partial w^{(4)}}
      =
      \\begin{bmatrix}
      \\delta_1^{(4)} \\\\
      \\delta_2^{(4)}
      \\end{bmatrix}_{2 \\times 1}
      \\times
      \\begin{bmatrix}
      a_1^{(3)} & a_2^{(3)}
      \\end{bmatrix}_{1 \\times 2}
      $$


      $$
      w_{new}^{(4)} = w_{old}^{(3)} - \\eta \\cdot \\frac{\\partial C_x}{\\partial w_{old}^{(3)}}
      $$

      $$
      \\frac{\\partial C_x}{\\partial w^{(3)}}
      =
      \\begin{bmatrix}
      \\delta_1^{(3)} \\\\
      \\delta_2^{(3)}
      \\end{bmatrix}_{2 \\times 1}
      \\times
      \\begin{bmatrix}
      a_1^{(2)} & a_2^{(2)}
      \\end{bmatrix}_{1 \\times 2}
      $$
      $$
      \\text{And so on... we can Update the weight and Biases.}
      $$
    </fieldset>

    <p>
      Starting from the last layer (L), we use Equation 1 to find the error. Then, we go backward, layer by layer (l =
      L-1, L-2, ...), using Equation 2 to find the error $\\delta^{(l)}$ for each hidden layer.
    </p>
    <p>
      At each layer, we use Equations 3 and 4 to find the gradients for the weights and biases. Finally, we use those
      gradients to update all the parameters in the network. And that... is how a neural network learns!
    </p>
  `,
        []
    );

    return (
        <article className="mj-post" ref={containerRef}>
            {/* Local styles scoped to the blog container */}
            <style>{`
        .mj-post {
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
          line-height: 1.6;
          margin: 20px auto;
          padding: 0 20px;
          color: #ffffffff;
        }
        .mj-post h1, .mj-post h2, .mj-post h3, .mj-post h4, .mj-post h5, .mj-post h6, .mj-post b {
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
          color: #ffffffff;
        }
        .mj-post h2 { border-bottom: 2px solid #444; padding-bottom: 10px; }
        .mj-post h3 { color: #C86DD7; }
        .mj-post img { max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; }
        .mj-post hr { border: 0; height: 1px; background: #444; margin: 40px 0; }
        .mj-post fieldset { border: 1px solid #444; border-radius: 5px; margin: 20px 0; background-color: rgba(200, 109, 215, 0.05); padding: 10px 20px; }
        .mj-post legend > b { font-size: 1.1em; color: #C86DD7; }
        .mj-post blockquote { border-left: 4px solid #C86DD7; background-color: rgba(200, 109, 215, 0.08); padding: 10px 20px; margin: 20px 0; font-style: italic; color: #ffffffff; }
        .mj-post p { color: #ffffffff; }
        .mj-post ul, .mj-post ol { color: #A0A0A0; }
        .mj-post li { color: #ffffffff; }
      `}</style>

            {/* Optional Google Fonts preload (can move to _document.html or index.html if you prefer) */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
                rel="stylesheet"
            />

            <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
    );
}
