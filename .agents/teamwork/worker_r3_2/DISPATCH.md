## 2026-10-22T19:14:30Z
You are worker_r3_2.
Your working directory is:
c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_r3_2

MANDATORY FIRST STEP:
Read the authoritative user request at:
c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md
Pay special attention to ## Follow-up — 2026-10-22T18:44:44Z.

Also carefully read the adversarial failure report from challenger_r3_2:
c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_r3_2\handoff.md
And inspect the reproduction script:
c:\Users\gorni\Desktop\kmuserviceharzapp\empirical_adversarial_suite.py

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVE FILE OWNERSHIP:
You own and will modify:
1. c:\Users\gorni\Desktop\kmuserviceharzapp\run_collision_tests_r3.py
2. c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Runde3_Final.md
3. c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\KI_Naming_Methoden_und_Workflows.md
4. c:\Users\gorni\Desktop\kmuserviceharzapp\README.md
5. c:\Users\gorni\Desktop\kmuserviceharzapp\CHANGELOG.md
6. c:\Users\gorni\Desktop\kmuserviceharzapp\TODO.md

TASKS TO EXECUTE:
1. Fix the DIN 31634 boundary condition bug in `run_collision_tests_r3.py`:
   - In `koelner_phonetik(word)`: Ensure that `next_char` and `prev_char` checks do not evaluate empty string `''` as matching `'CSZ'` or `'CKQ'`.
     Replace `if next_char in 'CSZ':` with `if next_char and next_char in 'CSZ':`.
     Check all occurrences of `in '...'` against `prev_char` and `next_char`.
   - Verify that test vectors pass:
     `Müller-Lüdenscheidt` -> `65752682`
     `Frankfurt` -> `3764372`
     `Xavier` -> `4837`
     `Klarbund` -> `457162`
     `Ruhebund` -> `7162`
     `Masshalt` -> `6852`
     `Festtakt` -> `38242`

2. Update `DOCS/Markennamen_Strategie_Runde3_Final.md`:
   - Correct the 4 documented DIN 31634 codes:
     - `Klarbund`: `457162` (was `457168`)
     - `Ruhebund`: `7162` (was `7168`)
     - `Masshalt`: `6852` (was `6858`)
     - `Festtakt`: `38242` (was `38248`)
   - Candidate 8 (`Taktiva`): Address the acute commercial and trademark collision with `Taktiva GzFr GmbH` / `taktiva.com` (operating in SME bookkeeping and tax portal in the EU, Nice Class 35). Replace Candidate 8 in the Top-10 table and candidate profiles with a 100% clean, non-colliding neologism in Direction C (e.g. `Taktura` or `Logitakt` or `Praxiva` or `Klarura` - ensure both `<name>-harz.de` and `<name>.de` are free, no collisions, claims <= 5 words, no buzzwords), or document the conflict and provide the clean alternative as primary. Ensure all 10 candidates in the final table and profiles remain compliant.
   - For `Bürogriff`: Add explicit § 8 Abs. 2 Nr. 2 MarkenG legal safeguard guidance (recommend filing as Wort-Bildmarke due to generic category term "Büro" and physical hardware meanings).
   - For `Kraftschluss`: Add explicit Class 42 service specification guidance (exclude mechanical engineering).
   - For `Masshalt`: Add explicit § 8 Abs. 2 Nr. 1 MarkenG safeguard guidance (recommend filing as Wort-Bildmarke against laudatory claims).

3. In `DOCS/KI_Naming_Methoden_und_Workflows.md`:
   - In Methode 3 and Methode 8, add an educational note clarifying that LLMs due to subword tokenization (BPE) cannot natively count characters/syllables or compute stateful DIN 31634 lookaheads reliably, explaining why programmatic script verification (as in Part 4) is mandatory.

4. Execute verification:
   - Run `python run_collision_tests_r3.py`
   - Run `python empirical_adversarial_suite.py`
   - Run `npm run test:features` and `npm run build`
   Ensure all pass with exit code 0.

5. Update living documentation (`README.md`, `CHANGELOG.md`, `TODO.md`) with the fixes.
