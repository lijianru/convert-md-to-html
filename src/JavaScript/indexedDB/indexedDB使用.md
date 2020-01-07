## 概述
> indexedDB就是浏览器提供的本地数据库

## 特点
- 键值对存储：indexedDB内部采用对象仓库(object store)存放数据，对象仓库中以键值对的形式保存数据
- 异步：IndexedDB是异步的，操作时不会锁死浏览器
- 支持事务：一系列操作中只要异步失败整个事务就会取消，数据库回滚到之前的状态
- 同源限制：网页只能访问同源的数据库
- 存储空间大：通常不少于250MB甚至没有上限
- 支持二进制存储：IndexedDB不仅可以存储字符串还可以存储二进制数据

## 基本概念
- 数据库：一系列相关数据的容器，每个(同)源可以新建多个数据库，同一时刻只能有一个版本的数据库存在
- 对象仓库：每个数据库包含若干个对象仓库，类似于关系型数据库的表格
- 数据记录：对象仓库保存的是数据记录，每条记录类似于关系型数据库的行，但是它只有主键和数据体
- 索引：为加速数据的检索可在对象仓库里为不同的属性建立索引
- 事务：数据的读写和删改都要通过事务完成

## 操作
### 打开数据库
```
var request = window.indexedDB.open(databaseName, version)
```
> 接受两个参数，第一个是字符串表示数据库的名字，第二个是整数，表示版本号。返回一个IDBRequest对象，这个对象通过三个时间处理打开数据库的操作
- error：打开数据库失败
```
request.onerror = function (event) {
  console.log('数据库打开报错');
}
```
- success：打开成功
```
request.onsuccess = function(event) {
  const db = request.result // 数据库实例
  console.log('onsuccess', event)
}
```
- upgradeneeded：如果指定的版本号大于实际的版本号，就会触发
```
request.onupgradeneeded = function (event) {
  const db = event.target.result // 数据库实例
  console.log('onupgradeneeded', db)
}
```
### 新建数据库
> 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在就会新建。后续的操作主要在upgradeneeded事件的监听函数中完成。
```
  request.onupgradeneeded = function (event) {
    const db = event.target.result
    let objectStore
    // 判断对象仓库是否存在（表格）
    if (!db.objectStoreNames.contains('person')) {
      objectStore = db.createObjectStore('person', {keyPath: 'id'})
      // 新建索引，三个参数分别为：索引名称，索引所在属性，配置对象（说明该属性是否包含重复的值）
      objectStore.createIndex('name', 'name', {unique: false})
    }
  }
```
### 新增数据
> 新增数据指的是向对象仓库写入数据记录，需要通过事务完成
```
  function addData() {
    const db = request.result
    // 事务的参数分别是：表格名称和操作模式('只读'和'读写')
    const transactionRequest = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({id: 1, name: '张三', age: 24, email: 'zhangsan@qq.com'})

    transactionRequest.onsuccess = function (event) {
      console.log('数据写入成功')
    }

    transactionRequest.onerror = function (event) {
      console.log('数据写入失败')
    }
  }
```
### 读取数据
```
  function readData() {
    const db = request.result
    const transaction = db.transaction(['person'])
    const objectStore = transaction.objectStore('person')
    // 读取数据，参数是主键的值
    const storeRequest = objectStore.get(1)

    storeRequest.onerror = function (event) {
      console.log('读取失败！')
    }

    storeRequest.onsuccess = function (event) {
      if (db && transaction && objectStore && storeRequest) {
        console.log('Name: ', storeRequest.result.name)
        console.log('Age: ', storeRequest.result.age)
        console.log('Email: ', storeRequest.result.email)
      } else {
        console.log('未读取到数据！')
      }
    }
  }
```
### 遍历数据
```
  function readAllData() {
    const db = request.result
    const objectStore = db.transaction('person').objectStore('person')

    // 使用指针对象IDBCursor遍历表格的所有记录，新建指针对象的openCursor方法是一个异步操作
    objectStore.openCursor().onsuccess = function (event) {
      const cursor = event.target.result

      if (cursor) {
        console.log('Id: ', cursor.key)
        console.log('Name: ', cursor.value.name)
        console.log('Age: ', cursor.value.age)
        console.log('Email: ', cursor.value.email)
        cursor.continue()
      } else {
        console.log('没有更多的数据了')
      }
    }
  }
```
### 更新数据
```
  function update() {
    const db = request.result
    // 使用put方法更新数据
    const updateRequest = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .put({ id: 1, name: '李四', age: 35, email: 'lisi@qq.com' })

    updateRequest.onsuccess = function (event) {
      console.log('数据更新成功！')
    }

    updateRequest.onerror = function (event) {
      console.log('数据更新失败！')
    }
  }
```
### 删除数据
```
  function remove() {
    const db = request.result
    // 使用delete方法删除记录，参数为要删除数据的索引
    const removeRequest = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .delete(1)

    removeRequest.onsuccess = function (event) {
      console.log('数据删除成功！')
    }
  }
```
### 使用索引
```
  function searchIndex() {
    const db = request.result
    const transaction = db.transaction(['person'], 'readwrite')
    const store = transaction.objectStore('person')
    const index = store.index('name')
    const searchRequest = index.get('张三')

    searchRequest.onsuccess = function (event) {
      const result = event.target.result
      if (result) {
        // 找到对应name的那一条数据
        console.log('searchRequest: ', result)
      }
    }
  }
```
