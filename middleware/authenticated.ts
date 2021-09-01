// 認証済みかチェック。認証済みならhomeへリダイレクト。
// 認証済みユーザーがloginページへ遷移しようとしたときに実行されます。
// 同様に今後お届け先情報画面と履歴画面で適用

import { Context } from "@nuxt/types";

const authenticated = ({store,redirect}:Context) => {
    console.log("middleware/authenticatedでログイン認証スタート")
    if (!store.getters['user/isAuthenticated']) {
      console.log("ログインしてません");
    }else{
      console.log("ログインしてるのでログイン画面には行かせない")
      return redirect('/')
    }
  }
  export default authenticated;