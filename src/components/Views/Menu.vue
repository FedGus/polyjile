<template>
   <div class="main">
      <div class="sidebar">
        <ul>
          <li>
            <router-link to="/dashboard">
              <ion-icon name="albums-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/tasks">
              <ion-icon name="clipboard-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/calendar">
              <ion-icon name="calendar-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/testing">
              <ion-icon name="bug-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/reports">
              <ion-icon name="bar-chart-outline"></ion-icon>
            </router-link>
          </li>
          
        </ul>
      </div>
     
      
      
    </div>
</template>

<script>
export default {};
</script>

<style>
header {
  background: #0747a6;
  color: #deebff;
  padding: 0 10px;
  position: relative;
  display: flex;
  z-index: 3;
}

header a {
  color: #deebff;
  display: block;
  text-decoration: none;
  cursor: pointer;
  padding: 13px 10px;
}
.primary-header {
  background: #2684ff;
}
.nav-header {
  display: flex;
  position: absolute;
  right: 10px;
}
.sidebar {
  width: 45px;
  box-sizing: border-box;
  background: #f4f5f7;
  position: relative;
  z-index: 2;
}

ion-icon {
  font-size: 20px;
  color: #172b4d;
}
</style>