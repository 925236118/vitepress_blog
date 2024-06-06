- 参照: https://blog.csdn.net/kevinelstri/article/details/62419242
- 使用`$$`包含行内latex，使用`$$$$`包含行间latex
- 希腊字母
	- | 希腊字母     | 小写         |
	  | ------------ | ------------ |
	  | A `\Alpha  ` | α `\alpha  ` |
	  | B `\Beta   ` | β `\beta   ` |
	  | Γ `\Gamma  ` | γ `\gamma  ` |
	  | Δ `\Delta  ` | δ `\delta  ` |
	  | E `\Epsilon` | ϵ `\epsilon` |
	  | Z `\Zeta   ` | ζ `\zeta   ` |
	  | H `\Eta    ` | η `\eta    ` |
	  | Θ `\Theta  ` | θ `\theta  ` |
	  | I `\Iota   ` | ι `\iota   ` |
	  | K `\Kappa  ` | κ `\kappa  ` |
	  | Λ `\Lambda ` | λ `\lambda ` |
	  | M `\Mu     ` | μ `\mu     ` |
	  | N `\Nu     ` | ν `\nu     ` |
	  | Ξ `\Xi     ` | ξ `\xi     ` |
	  | O `\Omicron` | ο `\omicron` |
	  | Π `\Pi     ` | π `\pi     ` |
	  | P `\Rho    ` | ρ `\rho    ` |
	  | Σ `\Sigma  ` | σ `\sigma  ` |
	  | T `\Tau    ` | τ `\tau    ` |
	  | Υ `\Upsilon` | υ `\upsilon` |
	  | Φ `\Phi    ` | ϕ `\phi    ` |
	  | X `\Chi    ` | χ `\chi    ` |
	  | Ψ `\Psi    ` | ψ `\psi    ` |
	  | Ω `\Omega  ` | ω `\omega  ` |
- 运算符
	- | 命令        | 显示      |
	  | ----------- | --------- |
	  | `\pm`       | \pm       |
	  | `\times`    | \times    |
	  | `\circ`     | \circ     |
	  | `\cdot`     | \cdot     |
	  | `\cap`      | \cap      |
	  | `\supset`   | \supset   |
	  | `\supseteq` | \supseteq |
	  | `\geq`      | \geq      |
	  | `\in`       | \in       |
	  | `\propto`   | \propto   |
	  | `\leq`      | \leq      |
	  | `\subseteq` | \subseteq |
	  | `\subset`   | \subset   |
	  | `\cup`      | \cup      |
	  | `\bullet`   | \bullet   |
	  | `\div`      | \div      |
	  | `\mp`       | \mp       |
- 常用求和符号和积分号
	- | 命令                | 显示结果          |
	  | ------------------- | ----------------- |
	  | `\sum`              | \sum              |
	  | `\int`              | \int              |
	  | `\sum_{i=1}^{N}`    | \sum_{i=1}^{N}    |
	  | `\int_{a}^{b}`      | \int_{a}^{b}      |
	  | `\prod`             | \prod             |
	  | `\iint`             | \iint             |
	  | `\prod_{i=1}^{N}`   | \prod_{i=1}^{N}   |
	  | `\iint_{a}^{b}`     | \iint_{a}^{b}     |
	  | `\bigcup`           | \bigcup           |
	  | `\bigcap`           | \bigcap           |
	  | `\bigcup_{i=1}^{N}` | \bigcup_{i=1}^{N} |
	  | `\bigcap_{i=1}^{N}` | \bigcap_{i=1}^{N} |
- 数学符号
	- | 命令             | 显示结果           |
	  | ---------------- | ------------------ |
	  | `\sqrt[3]{2}`    | $\sqrt[3]{2}$    |
	  | `\sqrt{2}`       | $\sqrt{2}$       |
	  | `x_{3}`          | $x_{3}$          |
	  | `\lim_{x \to 0}` | $\lim_{x \to 0}$ |
	  | `\frac{1}{2}`    | $\frac{1}{2}$    |
	  | `\cdotp`         | $\cdotp$         |
	  | `\infty`         | $\infty$         |
	  | `\cdots`         | $\cdots$         |
	  | `\bot`           | $\bot$           |
	  | `\ddots`         | $\ddots$         |
	  | `\partial`       | $\partial$       |
	  | `\hat{a}`        | $\hat{a}$        |
	  | `\dot{a}`        | $\dot{a}$        |
	  | `\bar{a}`        | $\bar{a}$        |
	  | `a^{3}`          | $a^{3}$          |
	  | `\sqrt{a}`       | $\sqrt{a}$       |
	  | `\vec{a}`        | $\vec{a}$        |
	  | `\tilde{a}`      | $\tilde{a}$      |
	  | `\lim_{x \to 0}` | $\lim_{x \to 0}$ |
	  | `\sqrt[3]{2}`    | $\sqrt[3]{2}$    |
	  | `\frac{1}{a}`    | $\frac{1}{a}$    |
- 矩阵
	- 使用四种进行环境配置 ，用 & 隔开每个元素，用`\\` 换行
	- 1. matrix：无外框
	- 2. bmatrix：方框
	- 3. pmatrix：圆括号
	- 4. vmatrix：行列式形式，竖线
	- 例如：单位矩阵
		```latex
		\begin {pmatrix}
		1 & 0 \\ 
		0 & 1 
		\end {pmatrix}
		```
	- 将渲染成
	- $\begin {pmatrix}1 & 0 \\ 0 & 1 \end {pmatrix}$