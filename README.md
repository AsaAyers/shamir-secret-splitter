# Experimental

This project is still experimental and may continue to change. I cannot
guarantee that pages printed today will continue to scan in the future.

# Overview

Say you have an important password to backup in case you ever forget it. Maybe
you use a password manager for most passwords, but how do you backup your
password for your password manager? You don’t want to just write it down because
anyone who finds it will have your password.

Using the Shamir Secret Splitter you can split your password into pices and
store them in different places. You might decide to split it into 4 pages and
any set of 3 can be used to assemble the password.

Each page contains a QR code with a link back to this site. No special software
is needed, just point your phone's camera at the page and follow the link. From
the limited testing I’ve done, it seems like QR code scanners are built into the
default camera apps on Android and iOS. When the camera finds a QR code you
should get some kind of notification asking if you want to open the link in your
browser. If it doesn’t work, you may need to go change a setting to turn on QR
code scanning.

When you arrive on the "Assemble Secret" page it has a Scan QR Codes button that
you can use to scan the remaining pages. But what if you can't scan a QR code?
Every page also has a series of words that contain the same piece of your secret
as the QR code. If you need to, you can simply type those into the "Assemble
Secret" page.

# Details

I built this project because I was inspired by [Matt Parker’s][MattParker] video
[How to keep an open secret with mathematics][video]. Instead of building
[Shamir’s Secret Sharing][wp] myself, this project is built around [this
implementation][shamir]. That library seems to encrypt each byte of the message.
This means the output is always the same length as the input. I don’t know how
to verify the security guarantees of this implementation.

The words used as a backup in case the QR code doesn’t scan uses the [PGP Word
List][wordlist].

# Security

I don't know how to verify the security of the [shamir][shamir] library I'm
using. It encrypts each byte of the message, and the word list replaces each
byte with a word. So the number of words on your secret page is also the number
of bytes in the original message.

If you know how to verify the security of this system, or know how to improve it
please let me know by opening an issue here on GitHub.


[MattParker]: http://standupmaths.com/
[video]: https://www.youtube.com/watch?v=K54ildEW9-Q
[wp]: https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing
[shamir]: https://www.npmjs.com/package/shamir
[wordlist]: https://en.wikipedia.org/wiki/PGP_word_list
