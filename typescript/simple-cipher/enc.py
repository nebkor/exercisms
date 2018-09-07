A0 = ord('a')
SPAN = 26

def ord2char(o):
    return chr(o + A0)

def char2ord(c):
    return ord(c) - A0

def enc(msg, key):
    ret = ""
    for i in xrange(len(msg)):
        k_ord = char2ord(key[i])
        m_ord = char2ord(msg[i])
        c_ord = (k_ord + m_ord) % SPAN
        ret += ord2char(c_ord)

    return ret

def dec(msg, key):
    ret = ""
    for i in xrange(len(msg)):
        k_ord = char2ord(key[i])
        m_ord = char2ord(msg[i])
        p_ord = (m_ord - k_ord)
        if p_ord < 0:
            p_ord = SPAN + p_ord
        ret += ord2char(p_ord)

    return ret


KEY_A = "aassthaksthaaaaaaaaaaaaaaaaaaaaaabsatehsateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
KEY_Z = "zzzsanteohsutzzsatzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"

MSG = "abcdeflmnoxyz"

print enc(MSG, KEY_A)
print enc(MSG, KEY_Z)

print "now decode"

assert(dec(enc(MSG, KEY_A), KEY_A) == MSG)
assert(dec(enc(MSG, KEY_Z), KEY_Z) == MSG)
