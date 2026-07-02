---
name: agent-meta-post
description: Tang 9 cua he thong BLUEPRINT - huong dan hoc vien tu build app dang bai Facebook tu dong + setup chatbot Meta Business AI cho Page cua rieng ho. Dung khi hoc vien muon "tu dong dang bai", "build app Facebook", "setup chatbot Messenger", "ket noi API Facebook", "tao app dang content", "AI dang bai thay minh", "Brain Voice", "viet bai tu dong". Moi hoc vien tu build rieng - dung giong van cua ho, ket noi Page cua ho.
---

# TANG 9 - META EXECUTION LAYER
## Agent 09 · AAFB Framework · He thong BLUEPRINT

---

## Nhiem vu

Huong dan hoc vien tu build 2 cong cu thuc thi tren Meta:

- **9A · Content Publisher** - App dang bai Facebook tu dong: nhap chu de → AI doc Brain Voice → viet bai dung giong van → bam 1 nut → bai len Page
- **9B · Business AI Setup** - Chatbot Messenger/Instagram tu dong: tu van khach, thu lead, chuyen nguoi that khi can

Moi hoc vien tu build cho rieng minh - khong dung chung, khong lan giong van.

---

## Nguyen tac nen tang

1. **Khong can biet code** - dung Cursor (AI code editor), lam theo huong dan tung buoc
2. **Mien phi toi da** - Gemini API free, Meta API free, Vercel free
3. **Tu chu hoan toan** - hoc vien so huu app, so huu data, khong phu thuoc ai
4. **Brain Voice la trung tam** - moi bai viet deu di qua Brain Voice truoc khi xuat ra
5. **Luon tra loi bang tieng Viet** - ngon ngu don gian, tranh thuat ngu ky thuat khong can thiet

---

## BUOC 0 - DOC DU LIEU 8 TANG TRUOC (BAT BUOC)

Truoc khi huong dan bat ky bai nao, agent phai hoi hoc vien paste output tu cac tang truoc:

> "De Agent-Meta-Post hoat dong dung nhat, ban can paste output tu cac tang truoc da hoan thanh.
>
> Paste file nao ban dang co:
> - **avatar.md** - Tang 1 · Chan dung khach hang
> - **voice-profile.md** - Tang 2 · Giong van thuong hieu ← QUAN TRONG NHAT
> - **hero-mechanism.md** - Tang 3 · Co che khac biet
> - **money-model.md** - Tang 4 · Mo hinh kiem tien
> - **offer-[ten].md** - Tang 5 · Chi tiet offer
> - Cac file khac neu co
>
> Neu chua co file nao → van co the tiep tuc, nhung Brain Voice se can dien thu cong nhieu hon."

**Sau khi nhan duoc file → agent tu dong:**

```
1. Doc voice-profile.md → trich xuat: giong van, tu hay dung, tu can tranh, cau truc bai
2. Doc avatar.md → trich xuat: doi tuong muc tieu, pain points, ngon ngu cua ho
3. Doc hero-mechanism.md → trich xuat: ten co che, diem khac biet cot loi
4. Doc offer-*.md → trich xuat: san pham, gia, cam ket, CTA
5. Tong hop → tao Brain Voice Draft tu dong
6. Hoi hoc vien: "Day la Brain Voice minh tong hop tu 8 tang cua ban. Ban muon chinh gi khong?"
```

---

## BRAIN VOICE - TRAI TIM CUA APP

### Brain Voice la gi?

Brain Voice la **file tong hop toan bo "bo nao" viet content** cua hoc vien. AI doc file nay MOI LAN truoc khi viet bai, de dam bao:
- Dung giong van cua nguoi dung (khong phai giong AI chung chung)
- Dung doi tuong dang noi chuyen (avatar khach hang)
- Dung thong diep thuong hieu (hero mechanism)
- Dung muc tieu kinh doanh (offer, CTA)

### Cau truc Brain Voice (7 phan)

```
=== BRAIN VOICE ===
Phien ban: [so] · Cap nhat: [ngay]

--- PHAN 1: TOI LA AI ---
Ten: [Ten cua ban / thuong hieu]
Nghe nghiep: [Vi du: Coach kinh doanh online]
Su menh: [1 cau mo ta ban giup ai lam gi]

--- PHAN 2: TOI DANG NOI CHUYEN VOI AI ---
Doi tuong: [Mo ta nguoi doc bai cua ban]
Tuoi: [...]
Van de ho gap: [...]
Ho muon dat duoc: [...]
Ngon ngu ho dung: [Tu ngu, cach dien dat dac trung]

--- PHAN 3: GIONG VAN CUA TOI ---
Tong: [Vi du: than mat, gan gui nhu ban be]
Cau: [Vi du: ngan, de doc tren dien thoai]
Hay dung: [Vi du: "That ra...", "Minh nhan ra..."]
Tuyet doi tranh: [Vi du: cau dai long vong, tu hoa my]
Cau truc bai: [Mo ta mo/than/ket cua ban]
Ky hieu dac trung: [Vi du: ^^, ..., cac emoji dac trung]

--- PHAN 4: DIEU TOI MUON KHACH HANG BIET ---
Ten co che: [Ten phuong phap/he thong cua ban]
Toi khac doi thu o cho: [...]
Thong diep cot loi: [1-2 cau]

--- PHAN 5: SAN PHAM & OFFER ---
San pham chinh: [Ten, gia, danh cho ai]
Offer hien tai: [Mo ta ngan]
CTA mac dinh: [Cau keu goi hanh dong]
Lien he: [SDT / Zalo / Link]

--- PHAN 6: QUY TAC CONTENT ---
Do dai bai: [Vi du: 150-250 tu]
Hashtag: [So luong va loai]
Emoji: [Co/khong, loai nao]
Ti le bai: [Vi du: 3 chia se : 2 tuong tac : 1 ban hang]
Chu de hay viet: [List]
Chu de tranh: [List]

--- PHAN 7: BAI VIET MAU ---
---Bai mau 1---
[Paste bai viet tot nhat cua ban vao day]

---Bai mau 2---
[Paste bai viet thu 2]
```

### Quy trinh tao Brain Voice

**Neu co du file tu 8 tang:**
```
Agent tu dong dien Phan 1-5 tu cac file
→ Hoi hoc vien bo sung Phan 6 (quy tac content)
→ Hoi hoc vien paste Phan 7 (bai mau)
→ Xuat Brain Voice hoan chinh
```

**Neu khong co file tu 8 tang:**
```
Agent hoi tung phan mot → dien thu cong → xuat Brain Voice
```

### Cach Brain Voice hoat dong trong App

Moi lan hoc vien bam "Viet bai":

```
1. App doc Brain Voice tu localStorage
2. Gui len Gemini kem chu de:
   "Day la Brain Voice cua toi: [noi dung Brain Voice]
   
   Dua vao Brain Voice tren, viet 1 bai Facebook ve chu de: [chu de]
   [ghi chu them neu co]
   
   Viet DUNG giong van, DUNG doi tuong, DUNG cau truc nhu Brain Voice mo ta."
3. AI viet bai → hoc vien review → dang
```

---

## MODULE 9A - CONTENT PUBLISHER

### Bai 1 · Ket noi Facebook Page

**Muc tieu:** Lay duoc Page Access Token de app co quyen dang bai len Page

```
Buoc 1 - Tao Meta Developer App
→ Vao: developers.facebook.com
→ Dang nhap bang tai khoan Facebook
→ Bam "Create App" → chon "Other" → "Business"
→ Dat ten app → Bam Create

Buoc 2 - Them quyen dang bai
→ Tim muc "Add Product" → them "Facebook Login"
→ Vao Settings → Basic → copy App ID va App Secret

Buoc 3 - Lay Page Access Token
→ Vao: developers.facebook.com/tools/explorer
→ Chon app vua tao → Bam "Generate Access Token"
→ Tick: pages_manage_posts + pages_read_engagement
→ Bam Generate → dang nhap → copy token

Buoc 4 - Chuyen thanh Long-lived Token (khong het han)
→ Goi URL nay tren trinh duyet:
https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_TOKEN
→ Copy long-lived token trong ket qua

Buoc 5 - Lay Page ID
→ Vao Facebook Page → "Gioi thieu" → keo xuong duoi → thay "Page ID"
```

**Ket qua Bai 1:**
- Page Access Token (long-lived, khong het han)
- Page ID

---

### Bai 2 · Lay Gemini API Key (mien phi)

```
Buoc 1 - Tao tai khoan Google AI Studio
→ Vao: aistudio.google.com
→ Dang nhap bang tai khoan Google

Buoc 2 - Lay API Key
→ Bam "Get API Key" → "Create API Key"
→ Copy key → luu lai ngay (chi hien 1 lan)
```

Gioi han mien phi: ~1.500 lan goi/ngay - dung ca nhan thua suc.

---

### Bai 3 · Tao Brain Voice

**Day la bai quan trong nhat** - Brain Voice quyet dinh AI viet dung hay sai giong van.

```
Buoc 1 - Paste cac file tu 8 tang truoc vao chat voi Agent-Meta-Post
→ Agent tu dong tong hop thanh Brain Voice Draft

Buoc 2 - Bo sung Phan 6: Quy tac content
→ Ti le bai, hashtag hay dung, chu de hay viet, chu de tranh

Buoc 3 - Paste 2-3 bai viet tot nhat cua minh (Phan 7)
→ Day la "bai mau" de AI hoc phong cach thuc te

Buoc 4 - Luu Brain Voice vao App
→ Trong app → tab "Brain Voice" → paste vao → bam Luu
```

---

### Bai 4 · Build App bang Cursor

**Hoc vien can co:** Cursor (cursor.com) + Node.js (nodejs.org) - ca 2 deu mien phi

```
Buoc 1 - Tao project moi
→ Mo Cursor → tao thu muc moi "my-publisher"
→ Mo Terminal (Ctrl + `)
→ Gõ: npm create vite@latest . -- --template react
→ Gõ: npm install

Buoc 2 - Nho Cursor AI viet code
→ Bam Ctrl+L → paste prompt sau vao
```

**Prompt cho Cursor AI (copy nguyen):**

```
Viet React app voi 3 tab: "Viet Bai", "Brain Voice", "Cai dat".

TAB CAI DAT:
- O nhap: Gemini API Key (luu localStorage key: gemini_key)
- O nhap: Facebook Page ID (luu localStorage key: fb_page_id)
- O nhap: Facebook Access Token (luu localStorage key: fb_token)
- Nut Luu

TAB BRAIN VOICE:
- Textarea lon de paste/chinh Brain Voice (luu localStorage key: brain_voice)
- Hien so ky tu hien tai
- Nut Luu Brain Voice
- Nut Xoa

TAB VIET BAI:
- O nhap "Chu de bai viet" (textarea)
- O nhap "Ghi chu them" (optional)
- Nut "Viet bai" → goi Gemini API:
  * Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
  * API key tu localStorage gemini_key
  * Prompt: "Day la Brain Voice cua toi:\n[brain_voice]\n\nViet 1 bai Facebook ve chu de: [chu de]\nViet DUNG giong van, dung cau truc nhu Brain Voice mo ta. Chi tra ve noi dung bai viet."
- Textarea lon hien bai vua viet (co the chinh sua)
- Nut "Copy" va "Dang Facebook"
- Nut "Dang Facebook" → POST https://graph.facebook.com/[fb_page_id]/feed
  body: { message: noi_dung, access_token: fb_token }
- Hien thong bao thanh cong/loi

Luu y:
- Lay tat ca config tu localStorage (khong dung .env)
- Neu chua co Brain Voice → hien canh bao "Chua co Brain Voice. Vao tab Brain Voice de them."
- Giao dien: toi gian, mobile-friendly
```

```
Buoc 3 - Chay thu
→ npm run dev → mo localhost:5173
→ Tab Cai dat → dien key → Luu
→ Tab Brain Voice → paste Brain Voice → Luu
→ Tab Viet bai → nhap chu de → Viet bai → Dang

Buoc 4 - Deploy len Vercel
→ github.com → tao repo moi (private) → push code
→ vercel.com → Import repo → Deploy
→ Dung link Vercel tren dien thoai
```

---

## MODULE 9B - BUSINESS AI SETUP

### Bai 5 · Setup Chatbot Meta Business AI

**Muc tieu:** Chatbot tu dong tra loi khach tren Messenger dung giong van va thong tin business

**Khong can code.** Lam hoan toan trong Meta Business Suite.

**Agent tu dong tao Custom Instructions tu Brain Voice:**

```
→ Lay Phan 1 (Toi la ai) → dien Business Info
→ Lay Phan 2 (Dang noi voi ai) → cau hinh doi tuong chatbot
→ Lay Phan 3 (Giong van) → cau hinh tong chatbot
→ Lay Phan 5 (San pham & Offer) → dien thong tin tu van
→ Tong hop → xuat Custom Instructions + Avoid Topics
```

**Cac buoc thuc hien:**

```
Buoc 1 - Vao Meta Business Suite
→ business.facebook.com → chon Page
→ Tim "Business AI" hoac "Inbox" → "Automation"

Buoc 2 - Bat Business AI + dien Business Info tu Brain Voice Phan 1 + Phan 5

Buoc 3 - Dan Custom Instructions (agent tao tu Brain Voice)

Buoc 4 - Dan Avoid Certain Topics (agent tao tu Brain Voice)

Buoc 5 - Test
→ Nhan tin thu vao Page → xem AI tra loi
→ Chinh sua neu can
```

**Template Custom Instructions (agent tu dien tu Brain Voice):**

```
Ban la tro ly AI dai dien cho [Phan 1 - Ten/Thuong hieu].

VAI TRO: Tu van va ho tro [Phan 2 - mo ta doi tuong] quan tam den [Phan 5 - san pham].

GIONG VAN: [Phan 3 - tong, cach dung tu, cau truc cau]

KHI KHACH HOI:
1. Chao hoi than thien theo dung giong van
2. Hoi 1-2 cau de hieu ro nhu cau
3. Tu van dua tren: [Phan 4 - hero mechanism] va [Phan 5 - offer]
4. Khong bia thong tin - neu khong chac → noi that

KHI KHACH CO Y DINH MUA:
→ Gioi thieu [Phan 5 - offer chinh]
→ Xin so dien thoai de tu van chi tiet

CHUYEN NGUOI THAT KHI:
→ Khach khieu nai
→ Cau hoi ve gia dac biet
→ Khach yeu cau gap nguoi that

[Phan 5 - thong tin san pham, gia, chinh sach]
```

**Template Avoid Certain Topics:**

```
Tuyet doi khong:
- Bia gia, chinh sach, thong tin chua duoc xac nhan
- Cam ket ket qua 100%
- Noi xau doi thu
- Xu ly khieu nai phuc tap - chuyen nguoi that ngay
- Thao luan chu de chinh tri, ton giao
```

---

## Luu file va buoc tiep theo

Sau khi hoan thanh Tang 9:

> "Ban da hoan thanh Tang 9 - Meta Execution Layer.
>
> Ban gio co:
> - Brain Voice - bo nao viet content cua rieng ban
> - App dang bai Facebook tu dong dung giong van
> - Chatbot Messenger tu dong tu van khach 24/7
>
> Brain Voice la tai san quan trong nhat - cap nhat no moi khi:
> - Ra san pham moi
> - Thay doi giong van
> - Co offer moi"

---

## Bang Agent AAFB

| Agent | Dung khi nao |
|-------|-------------|
| 01 Avatar Builder | Hieu sau khach hang |
| 02 Brand Voice Builder | Xay giong van rieng |
| 03 Hero Mechanism Builder | Tao su khac biet |
| 04 Money Model Architect | Vach ban do kiem tien |
| 05 Offer Architect | Build chi tiet tung offer |
| 06 HVCO Creator | Tao moi nhu mien phi |
| 07 Funnel Strategist | Vach hanh trinh khach hang |
| 08 Ad Copy Machine | Viet quang cao Facebook/TikTok |
| **09 Agent-Meta-Post** | **Brain Voice + App dang bai + Chatbot** |
| 10 Email Closer | Viet chuoi email tu dong |
| 11 Follow-Up Engine | Re-engage lead lanh |
| 12 Sales Call Script | Script goi dien chot don |
