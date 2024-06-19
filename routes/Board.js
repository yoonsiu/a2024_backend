import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

// context.js
// -1. BoardLayout.js
// 0. 목록보기 /board
// 1. 글쓰기 버튼 클릭하면  /board/write_board -> 글작성 후 저장 클릭 -> 목록보기
// 2. 수정 버튼 클릭 /board/edit_board/:id -> 수정 후 저장 클릭 -> 목록보기 

const data = [
    {
        id:1, 
        title : "openAPI",
        body : "한글은 아름다운 글입니다.",
        datetime : "2024.06.12"
    },
    {
        id:2, 
        title : "html",
        body : "하이퍼 텍스트 마그업 랭귀지",
        datetime : "2024.06.12"
    },
    {
        id:3, 
        title : "css",
        body : "cascading style sheet",
        datetime : "2024.06.12"
    },
    {
        id:4, 
        title : "javascript",
        body : "동적인 데이터 처리를 하기한 적응력이 높은 frontend 언어",
        datetime : "2024.06.12"
    }
    ]  


const Board = () => {
  // 맨처음 한번 역순으로 해두기 
  data.sort((prev, next)=> next.id - prev.id);
  const [ posts, setPosts ] = useState(data);

  const [ title, setTitle ] = useState();
  const [ body, setBody ] = useState();

  const [ isEditing, setIsEditing ] = useState(false);
  const [ editItem, setEditItem ] = useState({
    id: null, 
    title : "",
    body : "" 
  }); 


  const addPostHandle = (maxId, title, body)=>{
      const newPost = {
          // id : posts[posts.length-1].id + 1,
          id : Math.max( ...maxId ) + 1,
          title ,
          body, 
          datetime : format( new Date(), 'yyyy.MM.dd')
      }

      setPosts([newPost, ...posts]);
      // posts= [newPost, ...posts]
      // setPosts( posts => posts=posts.push( newPost ) )

      setTitle('');
      setBody('');
  }

  const onSubmitHandle = (e)=>{
      e.preventDefault()
      
      const maxId = posts.map(item=>item.id)

      addPostHandle( maxId, title, body )
  }

  const deleteHandle = (id)=>{
      const deleted = posts.filter(post=>post.id !== id)
      setPosts(deleted);
      // 개선 : useReducer로 개선,
  }

  const updateHandle = (id)=>{
      setIsEditing(true); // 수정할 창을 표시함

      // 
      const find = posts.find(post=>post.id === id); // 수정할 데이터 찾기
      setEditItem(find)// 창안에 수정할 데이터를 넣기
      // 수정할 데이터 저장. id
  }

  const setEditTitle = (value)=>{
      // setEditItem(editItem=>editItem.title = value )
      setEditItem({ ...editItem, title : value})
  }
  const setEditBody = (value)=>{
      // setEditItem(editItem=>editItem.body = value )
      setEditItem({ ...editItem, body : value})
  }
  const onSubmitEditHandle = () =>{
      setIsEditing(false) ;

      // const edit = posts.map( post=>{
      //     if(  post.id === editItem.id ){
      //        return editItem; 
      //     }else{
      //        return post;
      //     }
      // })
      
      const edit = posts.map( post=> post.id === editItem.id ?  editItem : post )

      setPosts(edit)
  }

  const [ search, setSearch ] = useState("")
  const [ searchPosts, setSearchPosts ] = useState([]); 
  const onSearchHandle = (e)=>{
     e.preventDefault();
      
  }
  const onSearchChangeHandle = (e)=>{ 
     setSearch(e.target.value)
     console.log( search )
  }

  useEffect(()=>{
      const filter =  posts.filter(post=> post.title.includes( search ) || post.body.includes( search ))
      setSearchPosts( filter )
  },[search, posts])

  return (
    <div>
      <form className='search' id='search'
            onSubmit={ (e)=> onSearchHandle(e) }
      > 
          <input type="search" 
                 placeholder='search'
                 onChange={(e)=>onSearchChangeHandle(e)} 
                 value={search}
            />
      </form>
      
      <form className="inputForm" 
            id="inputForm"
            onSubmit={ (e)=>onSubmitHandle(e) }>
          <div>
            <input type="text" 
                 placeholder='title'
                 onChange={(e)=>setTitle(e.target.value)}
                // document.querySelector(id).addEventListener(click,()=>{})
                 value={title}
            />
          </div>  
          <textarea  
                 placeholder='body'
                 onChange={(e)=>setBody(e.target.value)}
                 value={body}
          ></textarea>
          <button>등록</button>
      </form>
      {
        isEditing && 
              <form className="editForm" 
                    id='editForm'
                    onSubmit={ (e)=>onSubmitEditHandle(e) }>
                  <div>
                    <input type="text"  
                        onChange={(e)=>setEditTitle(e.target.value)}
                        //  document.querySelector(id).addEventListener(click,()=>{})
                        value={editItem.title}
                    />
                  </div>  
                  <textarea  
                        placeholder='body'
                        onChange={(e)=>setEditBody(e.target.value)}
                        value={editItem.body}
                  ></textarea>
                  <button>수정완료</button>
              </form>
      }
      <div>
        {
          posts.length &&  searchPosts.map( post=>(
              <div key={post.id}>
                <h2>{post.id} {post.title}</h2>
                <p>  {post.body}</p>
                <p>  {post.datetime}</p>
                <p>  
                    <button  onClick={ ()=>deleteHandle(post.id) }>삭제</button>
                    <button  onClick={ ()=>updateHandle(post.id) }>수정</button>
                </p>
              </div>
          ))
        }
      </div>
    </div>
    
  )
}

export default Board