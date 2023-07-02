# lecture-lens-frontend

Web Application written in React.

## TODO

- UOH-syllabus-searchをもとにトップページを作成
- 講義ごとの個別ページを作成
- Go-samoleのログイン画面をLectureLensにもってくる
- ログイン後の画面を作成
    - Reviewの作成ボタンと画面を作成

## ログインしてレビューを書く部分の提案
ログインしたときだけレビューを書くボタンを表示する、みたいなことは今の技術力だと難しいので、ログインしたとき用としてないとき用を別で作って表示を変える作戦。

## POSTMANの使い方

1. csrfトークンの取得
- `http://localhost:8080/csrf`にGET
- Headersに返ってきたトークンを`key:X-CSRF-TOKEN, value:{token}`と設定

2. signup
- bodyに`username, email, password`を設定
- `http://localhost:8080/signup`にPOST

3. login
- `http://localhost:8080/login`にPOST
- これでログイン完了

4. reviewをPOST
- bodyに`review_id, Reviewer_name, lecture_id, review_content, review_star`を入力
- `http://localhost:8080/review`にPOST